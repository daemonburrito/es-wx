# ES-WX Pure Client-Side Nexrad Visualization

This project aims to provide a pure client-side (browser, first) application
for visualization and intake of data from _Next Generation Weather Radar
(NEXRAD) Radar Product Generation Group (RPG)_.

The first UI implmented is a simple React app bootstrapped from `Create React App`.

## Motivation

This project is meant to be a way to get visualization on a much broader range
of devices by avoiding the requirement for the JVM. The JS for the product
codecs and visualization itself should run on any engine; node, JavascriptCore,
etc. The React UI is just PoC, but running on browsers will enable the widest
possible use.

## Status

Right now, just run the Jest suite with `yarn test` to see some decoded output.

This project is a baby. Some TODOs include:

- Sinks for the data.
  - Bitmap graphic formats like PNG, etc. for quick and simple display, or
    texture mapping.
  - Translation to vector data for WebGL. One advantage of the Typed Arrays API
    being required is that decoded products have arrays ready to go.
- Fetching of binaries from NOAA servers and responsible use of
  `ServiceWorkers` and caching for offline use and friendliness with limited
  resources.
  - Almost everyone will be using the 5-minute old data, as it is available on
    NOAA HTTP and FTP servers. Gracefully getting that data without getting in
    trouble is top priority.
  - I don't have a real-time paid connection, so someone who has such a
    connection will be required to decode streaming data.
