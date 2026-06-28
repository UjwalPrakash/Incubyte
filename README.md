# Incubyte
Assessment

## Test Execution

Run all tests in headed mode:

```bash
npm run test:headed
```

Run only the Login tagged scenario in headed mode:

```bash
npx bddgen; npx playwright test --headed --grep "@Login"
```

## Check Test Results

After execution, open the HTML report at:

`reports/html/index.html`

You can also open the report with:

```bash
npm run test:report
```
