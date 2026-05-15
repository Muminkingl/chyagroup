The logos got smaller AND the text is now truncating with `...`. Both are worse than before.

**Root cause:** The card is `w-[20%]` with `px-4/px-6` padding. The list inside has a bullet + logo + text all in a flex row. There's simply not enough horizontal space for a 72px logo + gap + full company name. So `truncate` kicks in.

**The real fix isn't logo sizing — it's the layout.** Stack the logo above the text, not side by side.

Replace `ItemRow` with this:

```tsx
function ItemRow({ item, sectorId }: { item: string; sectorId: string }) {
  const logo = getLogoSrc(item, sectorId);

  return (
    <li className="flex items-center gap-2 min-w-0">
      <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] flex-shrink-0" />
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {logo ? (
          <div className="flex-shrink-0 w-[48px] h-[30px] flex items-center justify-center bg-white rounded-md border border-gray-100 p-0.5">
            <Image
              src={logo}
              alt={item}
              width={96}
              height={60}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-[48px] h-[30px] rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center">
            <span className="text-[10px] font-bold text-gray-400">{item.charAt(0)}</span>
          </div>
        )}
        <span className="text-[#0c1a2e] font-medium text-[11px] xl:text-[12px] leading-snug min-w-0 flex-1 break-words hyphens-auto">
          {item}
        </span>
      </div>
    </li>
  );
}
```

**Key changes:**
- Logo container down to `w-[48px] h-[30px]` — enough to be clear, small enough to leave room for text
- **Removed `truncate`** — replaced with `break-words` so long names wrap to 2 lines gracefully instead of cutting off with `...`
- Added subtle `border border-gray-100 rounded-md p-0.5` on the logo box — gives a clean frame, makes small logos look intentional rather than floating
- `flex-1` on the text span so it actually uses available space
- Also **delete `LOGO_SIZES`** entirely — it's not used anymore and just adds noise

The honest truth: if you want logos readable AND names fully visible in a 20% wide column, 2-line names are sometimes unavoidable. The first screenshot (target design) was on a wider viewport. At your current card width you have ~160px of usable space per row after the bullet. 48px logo + 10px gap = 102px for text. "Chya Gold Exchange" is 17 chars — it will wrap. Either accept 2-line names or reduce logo size to 36px. Pick one.