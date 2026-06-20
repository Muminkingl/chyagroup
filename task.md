## News Module Improvements & Fixes

Please review the `/news` section and implement the following improvements.

---

# 1. News Image Display Quality Issue

There is an issue with how some news images are displayed.

I understand this is primarily caused by the uploaded image itself, but the current UI makes the issue much more noticeable.

### Current Problem

Some uploaded images:

* Look blurry
* Look cropped incorrectly
* Lose important content
* Appear zoomed in
* Do not display clearly inside the news card

In some cases, the original image is a full-size image, but the news card layout causes important parts of the image to be hidden.

---

## Required Solution

Please investigate and implement the best possible solution.

Possible improvements:

* Better image aspect ratio handling
* Smart image cropping
* Object-fit optimization
* Image focal point support
* Responsive image rendering
* Better thumbnail generation
* Proper image resizing before display

### Goal

Images should remain:

* Clear
* Professional
* Easily visible
* Properly framed

without cutting off important content.

---

# 2. Replace "CG" Circle With Main Logo

Current Situation:

Some sections display a placeholder circle containing:

`CG`

---

## Required Change

Replace the "CG" placeholder with the actual main website logo.

Requirements:

* Use official logo asset
* Maintain proper sizing
* Preserve aspect ratio
* Support dark mode
* Support mobile devices
* Support desktop devices

The logo should appear consistently across all languages and all pages.

---

# 3. Mobile Responsiveness Issue in Edit Post Page

Route:

`/admin/edit-post/*`

Current Problem:

On mobile devices, the Edit functionality becomes difficult or impossible to access.

The page is not fully responsive.

---

## Required Fix

Make the entire Edit Post page fully responsive.

Verify:

* Edit button visibility
* Save button visibility
* Publish button visibility
* Image upload controls
* Gallery controls
* Rich text editor
* Form fields
* Navigation actions

for:

* Mobile
* Tablet
* Desktop

No important actions should become hidden or inaccessible on smaller screens.

---

# 4. Reorder Gallery Images (High Priority)

Route:

`/admin/edit-post/[id]`

Field:

`Additional Gallery Images (R2)`

---

## Current Problem

Multiple gallery images can be uploaded, but there is no way to control the display order easily.

The first image becomes very important because it is usually shown first across the website.

---

## Required Feature

Allow administrators to reorder gallery images manually.

Example:

Current Order:

1. Image A
2. Image B
3. Image C
4. Image D

Administrator should be able to change it to:

1. Image C
2. Image A
3. Image D
4. Image B

and save the new order.

---

## Drag & Drop Support

Implement drag-and-drop reordering.

Example:

* Click and hold image
* Drag image to a new position
* Drop image
* Save order automatically or via Save button

The order should persist in the database and be respected everywhere the gallery is displayed.

---



## Mobile Support (Very Important)

The drag-and-drop image ordering system must work properly on:

* iPhone
* Android
* Tablets

Requirements:

* Touch support
* Smooth dragging
* Responsive layout
* No overlapping UI elements
* Easy reordering on small screens

---

# 5. Advanced News Image Gallery Experience (High Priority)

Route:

`/news/[slug]` (News Details Page)

---

## Current Situation

When a user opens a news article, they can see:

* Banner Image
* Gallery Images

However, the gallery experience is currently static and not very engaging.

---

## Required Improvement

Transform the image section into a modern interactive gallery/slider experience similar to professional news websites.

---

## Auto-Slideshow

When a news article contains multiple images:

* Automatically switch to the next image every **5 seconds**
* Loop continuously
* Smooth transition animations
* No page refreshes

Example:

Image 1 → 5 seconds → Image 2 → 5 seconds → Image 3 → ...

When the last image is reached:

Image N → Image 1

and continue looping.

---

## Manual Navigation

Users should also be able to control the gallery themselves.

Add:

### Previous Button

◀

### Next Button

▶

Users can manually move through images at any time.

---

## Smart Auto-Play Behavior

When the user manually changes an image:

* Pause auto-slide briefly
* Resume auto-slide after a few seconds

This creates a smoother user experience.

---

## Touch & Swipe Support

Mobile users should be able to:

* Swipe left
* Swipe right

to move between images naturally.

Requirements:

* Android support
* iPhone support
* Tablet support

---

## Image Counter

Display the current image position.

Example:

`1 / 8`

`2 / 8`

`3 / 8`

This helps users understand how many images exist in the article.

---

## Thumbnail Navigation

Below the main image, display small thumbnails.

Example:

[Image 1] [Image 2] [Image 3] [Image 4]

When a thumbnail is clicked:

* Open that image immediately
* Highlight the selected thumbnail

---

## Full-Screen Image Viewer

When clicking any image:

* Open full-screen gallery mode
* Dark background overlay
* Larger image preview

Users should still be able to:

* Navigate using arrows
* Swipe on mobile
* Use keyboard arrow keys on desktop
* Close using ESC or Close Button

---

## Performance Optimization

Requirements:

* Lazy load gallery images
* Smooth transitions
* No layout shifting
* Fast loading on mobile networks

---

## Responsive Design

The gallery must work perfectly on:

* Mobile
* Tablet
* Desktop

No cropping issues, broken layouts, or hidden controls.

---

## Expected Result

The News Details page should provide a professional image gallery experience where:

* Images automatically rotate every 5 seconds
* Users can manually navigate using arrows
* Users can swipe on mobile
* Users can click thumbnails
* Users can open images in full-screen mode
* The experience feels modern, polished, and similar to major news websites.


