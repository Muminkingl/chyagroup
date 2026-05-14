### `timelinesectors.tsx` — Final Text Display Fix

Everything looks good now except one remaining issue:

## Problem

Company names are showing with:

* `...`
* truncated/ellipsis text

Examples:

* `Lamat Al marj...`
* `Chya Gold Ex...`
* `Lutkay Chya ...`

This should NOT happen.

---

## Required Fix

* Show the FULL company names
* Remove text truncation / ellipsis behavior completely
* No `...` should appear

### Important

Keep the current clean layout exactly as it is:

* text stays inside the white container
* no overflow outside the card
* logos remain correct
* spacing/alignment stays clean

---

## Likely Cause

There is probably a class/style like:

```css
truncate
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
```

Remove or adjust that behavior for the company name text.

---

## Expected Result

Examples should display fully like:

* `Lamat Al marjan co.`
* `Chya Gold Exchange`
* `Lutkay Chya Exchange`
* `Barzy Chya Exchange`

without truncation.
