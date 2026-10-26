---
title: Frequency Spectrum
tags: [signal-processing, computer-graphics, computer-vision, multimedia]
---

A Fourier-Transform (or DCT, ...) takes a function as input and outputs another function that describes the extent to which various frequencies are present in the original function.

This works best for natural images (which is why JPG works best on natural images). In the image below, you can see the decomposition of a natural image and a rendered image. The red graphs show the intensities along the line (if the image was RGB, there would be 3 separate graphs for each color channel). This graph can be decomposed into a weighted sum of (co)sine waves. The frequencies of those waves are shown in the blue graphs.

![Natural image vs rendered image](/assets/images/natual-vs-rendered-image-spectrum.png)

It's not possible to perfectly represent the box graph present in the artificial image. You can add as many high frequency sine waves as you like, and you will get a slightly better approximation with each one, but you will eventually hit a wall and the error will converge.