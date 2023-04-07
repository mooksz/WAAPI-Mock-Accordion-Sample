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

## Description

There are two main components `Accordion.tsx` and `AccordionsList.tsx`. Both have there own tests:

_Accordion.test.tsx_

1. :white_check_mark: Should render
2. :white_check_mark: Should open and close -
   Both animations are captured when pressing the element to open en close.

_AccordionsLists.test.tsx_

1. :white_check_mark: Should render
2. :x: close an open accordion when another accordion is clicked -
   The AccordionsList component can be multi expand or single expand. When in single expand (default) the opened accordion should close when another accordion is openend. This is achieved by the `activeAccordion`-state in `AccordionsList.tsx`. The update function `setActiveAccordion` is passed to the child `Accordion.tsx` component. The `Accordion.tsx` updates the state if need be and checks if it should close itself in a `useEffect`-hook. Whenever an accordion opens or closes with the WAAPI animation `.onfinish`-method should run and update the `open` attribute and state of the accordion appropriately. This functionality is working properly in `dev` mode. When in `test`-mode, the animation and `.onfinish`-method seems to only be captured when `userEvent` is triggerd on the specific element. Eventhough the `shrink` function is called as seen in the `Accordion.tsx` logs (96).

    `AccordionsList.test.tsx` (67) log doesn't caputure the animation and `open` attribute / state isn't updated in test-dom. However in `Accordion.tsx` (96) logs that the function `shrink` is running during the test.
