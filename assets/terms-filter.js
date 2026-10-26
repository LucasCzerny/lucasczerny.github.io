/*
 * Client-side tag filtering for the term index.
 *
 * Each term in the index lists its tags as `data-tag` chips. Clicking a chip
 * (in the filter bar or under a term) shows only matching terms. The active
 * tag is mirrored into the URL as ?tag=<tag>, so a filtered view can be linked
 * to (the term pages link back that way).
 *
 * Without JavaScript the page still lists every term and its tags; only the
 * filtering is unavailable.
 */
(function () {
  "use strict";

  var list = document.getElementById("terms");
  if (!list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll("li.term"));
  var chips = Array.prototype.slice.call(
    document.querySelectorAll(".tag-chip[data-tag]")
  );
  var statusEl = document.getElementById("tag-status");
  var clearButton = document.getElementById("tag-clear");
  var activeTag = null;

  function tagsOf(item) {
    // The chips rendered under a term are the source of truth for its tags.
    return Array.prototype.slice
      .call(item.querySelectorAll(".tag-chip[data-tag]"))
      .map(function (chip) {
        return chip.getAttribute("data-tag");
      })
      .filter(function (tag) {
        return tag !== null && tag !== "";
      });
  }

  items.forEach(function (item) {
    item.termTags = tagsOf(item);
  });

  function tagExists(tag) {
    return items.some(function (item) {
      return item.termTags.indexOf(tag) !== -1;
    });
  }

  function readTagFromUrl() {
    try {
      return new URLSearchParams(window.location.search).get("tag");
    } catch (error) {
      return null;
    }
  }

  function writeTagToUrl(tag) {
    if (!window.history || !window.history.replaceState) return;
    try {
      var url = new URL(window.location.href);
      if (tag) {
        url.searchParams.set("tag", tag);
      } else {
        url.searchParams.delete("tag");
      }
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (error) {
      /* URL manipulation is a nicety; ignore failures (e.g. file://). */
    }
  }

  function render() {
    var visible = 0;

    items.forEach(function (item) {
      var matches = !activeTag || item.termTags.indexOf(activeTag) !== -1;
      item.hidden = !matches;
      if (matches) visible++;
    });

    chips.forEach(function (chip) {
      var selected = chip.getAttribute("data-tag") === activeTag;
      chip.classList.toggle("is-active", selected);
      chip.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    if (clearButton) clearButton.hidden = !activeTag;

    if (statusEl) {
      if (activeTag) {
        statusEl.textContent =
          "Showing " +
          visible +
          " of " +
          items.length +
          ' terms tagged \u201c' +
          activeTag +
          "\u201d.";
      } else {
        statusEl.textContent = items.length + " terms.";
      }
    }
  }

  function selectTag(tag) {
    activeTag = activeTag === tag ? null : tag;
    writeTagToUrl(activeTag);
    render();
  }

  document.addEventListener("click", function (event) {
    var chip = event.target.closest
      ? event.target.closest(".tag-chip[data-tag]")
      : null;
    if (!chip) return;
    event.preventDefault();
    selectTag(chip.getAttribute("data-tag"));
  });

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      activeTag = null;
      writeTagToUrl(null);
      render();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !activeTag) return;
    activeTag = null;
    writeTagToUrl(null);
    render();
  });

  activeTag = readTagFromUrl();
  if (activeTag && !tagExists(activeTag)) activeTag = null;
  render();
})();
