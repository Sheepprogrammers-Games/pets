# Scene generation prompts

Generated through the OpenAI Image API with `gpt-image-2`, `1536x1024`, low quality. Web derivatives are resized to `1200x800` WebP at quality 86.

## Shared direction

- Use case: `stylized-concept`
- Style: original premium Japanese storybook game background, soft digital gouache, crisp controlled linework, layered fur, tactile painted wood and linen, sophisticated mobile-game key art, not flat vector art.
- Composition: wide 3:2 scene, eye-level, pet centered and occupying the middle 35–45 percent, sunlit window and organized shelves in the background, enough quiet space around the pet for UI overlays.
- Lighting: clear late-morning window light, gentle warm bounce light, calm and caring mood.
- Constraints: no text, no logo, no watermark, no interface panels, no people, no other animals, no medical needles, no photorealism, no emoji, no sticker style, no thick white outline.

## Subjects

- `dog.webp`: A small fluffy corgi patient sitting calmly on the center of a low walnut veterinary examination table inside a cozy boutique animal clinic.
- `cat.webp`: A fluffy gray-and-white domestic longhair cat patient sitting calmly on the center of the table.
- `rabbit.webp`: A small orange-and-white lop-eared rabbit patient sitting calmly on the center of the table.
- `hamster.webp`: A tiny round golden Syrian hamster patient, scaled large enough to read clearly in a game scene.
- `poodle.webp`: A small fluffy cream toy poodle patient sitting calmly on the center of the table.
- `fox.webp`: A gentle young red fox patient sitting calmly on the center of the table.

## Interactive cutouts

Each approved pet scene was supplied back to `gpt-image-2` as an edit reference. The request preserved the exact face, markings, fur color and digital-gouache rendering while isolating the full-body animal on a perfectly uniform `#ff00ff` background. The local imagegen chroma-key helper removed the background with soft matte, despill and one-pixel edge contraction. Runtime derivatives are 800×800 transparent WebP files under `assets/pets/`.

## Empty rooms

Three `gpt-image-2` environment generations share the same premium storybook direction and reserve a clear center for the separate pet layer:

- `assets/rooms/clinic.webp`: sunlit boutique treatment room with a centered walnut exam table.
- `assets/rooms/garden.webp`: secure clover garden with hydrangeas, shade tree and play tunnel.
- `assets/rooms/lounge.webp`: recovery lounge with a large linen cushion, woven rug and warm lamp.
