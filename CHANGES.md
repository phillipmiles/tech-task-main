# Changes

## Fixes

- Added missing npm module @mui/material.
- Fixed add employee form not correctly saving all form fields.
- Fixed editing employee not working.
- Fixed spreadsheet downloading twice.
- Fixed typo in exported spreadsheet 'occuplaystation'.
- Fixed images defined in manifest file.
- Fixed react errors for lists missing keys.
- Fixed form validation for the phone number field.

## Improvements

- Added a delete employee action to the table rows.
- Added ability to sort table by column heading into ascending and descending order. (Click on table headings).
- Added tests for the useEmployee hook.
- Improved form validation to now require a valid email address rather than just a string.
- Improved add/edit employee modal with heading clarifying action and cancel button.
- Made various minor style tweaks for better clarity and focus.

## Possible future changes.

- Better form validation error message for phone number field. Currently says error jargon like "NaN".
- Search box for filtering table data.
- Adding/editing/deleting an employee shouldn't make the page skeleton appear as server request is occuring. Is distracting and suggests to the user that something more than just their perceived action on the one employee is happening. Instead show feedback within modal, maybe a spinner on the submit button to indicate their request is loading.
- Add additional tests. I.e on the effects of the table sorting functions on the UI.
- Changes for the table if it contains a large data set. I.e pagination.
