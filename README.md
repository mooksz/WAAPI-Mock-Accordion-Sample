## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

```
git clone https://github.com/mooksz/WAAPI-Mock-Accordion-Sample.git
npm install
npm run dev
```

## Testing components

If you want to run the jest tests, install packages and run `npm run test`

```
git clone https://github.com/mooksz/WAAPI-Mock-Accordion-Sample.git
npm install
npm run test
```

## Issues:

1. Unable to wrap `shrink()` & `expand()` in `requestAnimationFrame()`.
2. Required to await `userEvent.click()`, however never seen it in other docs.
3. Have to wrap `userEvent.click` & `.getAnimations` inside `act()`
