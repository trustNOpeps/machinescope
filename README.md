# MachineScope
Machine Intelligence / Applied AI for Engineering Systems.

A dependency-free browser-local condition analysis dashboard. Import CSV, choose a numeric sensor channel, inspect median/MAD anomaly scores, and export JSON reports or CSV anomalies. Demo data are deterministic synthetic signals, not measurements from a real machine.

[Portfolio — Engineering](https://trustnopeps.github.io/trustNOpeps/#project-machinescope) · [Method & case study](https://github.com/trustNOpeps/trustNOpeps/blob/main/projects/machinescope.md)

## Run
Open `dist/index.html` directly in a modern browser. No build, API key, account or installation required for the offline application. Alternatively run `python3 -m http.server 8000 --directory dist` and open localhost:8000.

## Test
`node test.cjs` — 11 analysis/parser tests. `node --check dist/app.js` — syntax check.

## Input
UTF-8 CSV, comma delimiter, unique nonempty headers, decimal point, at most 5 MiB and 50,000 nonempty data rows. At least 5 valid numeric readings in the selected channel and reference baseline. Blank/invalid readings are excluded, counted, and not replaced by zero. CSV row numbers refer to parsed nonempty records including the header (multiline quoted fields and blank source lines may differ from physical text line numbers). Units are descriptive column names only; no conversion occurs.

## Method
Absolute modified z-score = 0.67448975 * abs(x - median) / MAD. Default threshold is strictly greater than 3.5. Baseline can use the whole dataset or first 25% of rows. A constant reference (MAD = 0) produces zero score at the median and an infinite score for deviations. JSON uses the string Infinity for that case. RMS is calculated over all valid input values; it is not an ISO vibration severity rating. This is transparent statistical analysis, not a trained AI model, fault diagnosis, remaining useful life prediction, or safety certification.

The chart uses record order rather than elapsed time. Large series are sampled for rendering; statistics and exports always include every valid sample. The anomaly table shows up to 200 events, CSV includes all.

## Privacy
CSV content stays in browser memory, with no analytics or upload endpoint. Refresh clears imported data. Exported reports include source filename and selected readings: review before sharing. Hosting access is separate from application processing.

## Files
- `dist/index.html`: UI and guidance
- `dist/style.css`: responsive charcoal / green design
- `dist/core.js`: CSV parser, robust statistics, synthetic generator
- `dist/app.js`: interactions, chart and exports
- `test.cjs`: executable regression checks
- `.openai/hosting.json`: deployment identity

## Verification
11 Node tests passed and JavaScript syntax checked. Desktop browser rendered correctly; channel switch, first-quarter baseline and demo reset verified. Mobile CSS is implemented but has not been tested in a mobile viewport. Browser file import/download have not been end-to-end exercised; parser and export implementation checked in source. Demo vibration identifies six injected outliers. No real-machine dataset validated.

## GitHub Pages
Upload the contents of `dist/` to the selected Pages publishing directory. Alternatively deploy `dist/` using your preferred static host. Repository: https://github.com/trustNOpeps/machinescope (public). Hosted application: https://machinescope-hamka.girlslovre.chatgpt.site (public).

## Rollback
Restore a previous source commit and redeploy its matching static files. The app has no database or migration to reverse.
