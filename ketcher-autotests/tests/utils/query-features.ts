import { Page, expect } from '@playwright/test';
import { BondTypeName, TopPanelButton, selectTopPanelButton } from '@utils';
import { clickOnFileFormatDropdown } from '@utils/formats';

type queryNumberValues =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9';

type Aromaticity = 'aromatic' | 'aliphatic' | '';
type Chirality = 'clockwise' | 'anticlockwise' | '';

// Query specific attributes:

export async function setRingBondCount(page: Page, value: string) {
  await page.getByTestId('ringBondCount-input-span').click();
  await page.getByRole('option', { name: value }).click();
}

export async function setHCount(page: Page, hCount: queryNumberValues) {
  await page.getByTestId('hCount-input-span').click();
  await page.getByRole('option', { name: hCount }).click();
}

export async function setSubstitutionCount(
  page: Page,
  substitutionCount: queryNumberValues,
) {
  await page.getByTestId('substitutionCount-input-span').click();
  await page.getByRole('option', { name: substitutionCount }).click();
}

export async function setUnsaturated(page: Page) {
  await page.getByTestId('unsaturatedAtom-input').check();
}

export async function setImplicitHCount(
  page: Page,
  implicitHCount: queryNumberValues,
) {
  await page.getByTestId('implicitHCount-input-span').click();
  await page.getByRole('option', { name: implicitHCount }).click();
}

export async function setRingMembership(
  page: Page,
  ringMembership: queryNumberValues,
) {
  await page.getByTestId('ringMembership-input-span').click();
  await page.getByRole('option', { name: ringMembership }).click();
}

export async function setRingSize(page: Page, ringSize: queryNumberValues) {
  await page.getByTestId('ringSize-input-span').click();
  await page.getByRole('option', { name: ringSize }).click();
}

export async function setConnectivity(
  page: Page,
  connectivity: queryNumberValues,
) {
  await page.getByTestId('connectivity-input-span').click();
  await page.getByRole('option', { name: connectivity }).click();
}

export async function setAromaticity(page: Page, aromaticity: Aromaticity) {
  await page.getByTestId('aromaticity-input-span').click();
  await page.getByRole('option', { name: aromaticity }).click();
}

export async function setChirality(page: Page, chirality: Chirality) {
  await page.getByTestId('chirality-input-span').click();
  await page.getByRole('option', { name: chirality, exact: true }).click();
}

// Custom query:

export async function setCustomQuery(page: Page, customQuery: string) {
  await page.getByTestId('custom-query-checkbox').check();
  await page.getByTestId('custom-query-value').fill(customQuery);
}

// Bond attributes:
// TO DO: bondType must be specific type, not a string
export async function setBondType(page: Page, bondType: BondTypeName | string) {
  await page.getByTestId('type-input-span').click();
  await page.getByTestId(`${bondType}-option`).click();
}

export async function setBondTopology(page: Page, bondTopologyTestId: string) {
  await page.getByTestId('topology-input-span').click();
  await page.getByTestId(bondTopologyTestId).click();
}

// General atom properties attributes:

export async function setLabel(page: Page, value: string) {
  await page.getByTestId('label-input').fill(value);
}

export async function setCharge(page: Page, value: string) {
  await page.getByTestId('charge-input').fill(value);
}

export async function setAtomicMass(page: Page, value: string) {
  await page.getByTestId('isotope-input').fill(value);
}

export async function setValence(page: Page, valenceOption: string) {
  await page.getByTestId('explicitValence-input-span').click();
  await page.getByRole('option', { name: valenceOption }).click();
}

// Other

export async function checkSmartsValue(page: Page, value: string) {
  await selectTopPanelButton(TopPanelButton.Save, page);
  await clickOnFileFormatDropdown(page);
  await page.getByRole('option', { name: 'Daylight SMARTS' }).click();
  const smartsInput = page.getByTestId('smarts-preview-area-text');
  await expect(smartsInput).toHaveValue(value);
}

export async function checkSmartsWarnings(page: Page) {
  const value =
    'Structure contains query properties of atoms and bonds that are not supported in the SMARTS. Query properties will not be reflected in the file saved.';
  await page.getByTestId('warnings-tab').click();
  const warningSmartsTextArea = page
    .getByTestId('WarningTextArea')
    .filter({ hasText: 'SMARTS' });
  const warningText = await warningSmartsTextArea.evaluate(
    (node) => node.textContent,
  );
  expect(warningText).toEqual(value);
}
