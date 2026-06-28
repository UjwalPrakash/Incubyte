import fs from 'node:fs';
import path from 'node:path';
import { expect } from '@playwright/test';
import envConfig from '../../config/envConfig.js';

const testDataPath = path.resolve(process.cwd(), 'test-data', 'testData.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

export class LoginPage {
	constructor(page) {
		this.page = page;
		this.registrationState = {
			username: '',
			password: '',
			accountBalance: '',
		};

		this.xpath = {
			registerLink: "//a[normalize-space()='Register']",
			firstNameInput: "//input[@id='customer.firstName']",
			lastNameInput: "//input[@id='customer.lastName']",
			addressInput: "//input[@id='customer.address.street']",
			cityInput: "//input[@id='customer.address.city']",
			stateInput: "//input[@id='customer.address.state']",
			zipCodeInput: "//input[@id='customer.address.zipCode']",
			phoneInput: "//input[@id='customer.phoneNumber']",
			ssnInput: "//input[@id='customer.ssn']",
			registrationUsernameInput: "//input[@id='customer.username']",
			registrationPasswordInput: "//input[@id='customer.password']",
			confirmPasswordInput: "//input[@id='repeatedPassword']",
			registerSubmitButton: "//input[@type='submit' and @value='Register']",
			loginUsernameInput: "//input[@name='username']",
			loginPasswordInput: "//input[@name='password']",
			loginButton: "//input[@type='submit' and @value='Log In']",
			logoutLink: "//a[contains(normalize-space(), 'Log Out')]",
		};

		this.registerLink = page.locator(this.xpath.registerLink);
		this.firstNameInput = page.locator(this.xpath.firstNameInput);
		this.lastNameInput = page.locator(this.xpath.lastNameInput);
		this.addressInput = page.locator(this.xpath.addressInput);
		this.cityInput = page.locator(this.xpath.cityInput);
		this.stateInput = page.locator(this.xpath.stateInput);
		this.zipCodeInput = page.locator(this.xpath.zipCodeInput);
		this.phoneInput = page.locator(this.xpath.phoneInput);
		this.ssnInput = page.locator(this.xpath.ssnInput);
		this.registrationUsernameInput = page.locator(this.xpath.registrationUsernameInput);
		this.registrationPasswordInput = page.locator(this.xpath.registrationPasswordInput);
		this.confirmPasswordInput = page.locator(this.xpath.confirmPasswordInput);
		this.registerSubmitButton = page.locator(this.xpath.registerSubmitButton);
		this.usernameInput = page.locator(this.xpath.loginUsernameInput);
		this.passwordInput = page.locator(this.xpath.loginPasswordInput);
		this.loginButton = page.locator(this.xpath.loginButton);
		this.logoutLink = page.locator(this.xpath.logoutLink);
	}

	async launchApplication() {
		await this.page.goto(envConfig.baseUrl);
		await expect(this.page.getByText('Customer Login')).toBeVisible();
	}

	async clickRegisterLink() {
		await this.registerLink.click();
	}

	async fillRegistrationFormWithValidDetails() {
		const randomThreeCharLastName = Math.random().toString(36).substring(2, 5);
		const randomSixDigitZipCode = `${Math.floor(100000 + Math.random() * 900000)}`;
		const randomTenDigitPhone = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
		const randomSixDigitSsn = `${Math.floor(100000 + Math.random() * 900000)}`;
		this.registrationState.username = `${testData.firstName}_${randomThreeCharLastName}`;
		this.registrationState.password = testData.password;

		await this.firstNameInput.fill(testData.firstName);
		await this.lastNameInput.fill(randomThreeCharLastName);
		await this.addressInput.fill(testData.address);
		await this.cityInput.fill(testData.city);
		await this.stateInput.fill(testData.state);
		await this.zipCodeInput.fill(randomSixDigitZipCode);
		await this.phoneInput.fill(randomTenDigitPhone);
		await this.ssnInput.fill(randomSixDigitSsn);
		await this.registrationUsernameInput.fill(this.registrationState.username);
		await this.registrationPasswordInput.fill(this.registrationState.password);
		await this.confirmPasswordInput.fill(testData.confirmPassword || this.registrationState.password);
	}

	async submitRegistrationForm() {
		await this.registerSubmitButton.click();
	}

	async verifyAccountCreatedSuccessfully() {
		await expect(this.page.getByText(/Your account was created successfully/i)).toBeVisible();
	}

	async logout() {
		await this.logoutLink.click();
	}

	async loginWithCreatedCredentials() {
		await this.usernameInput.fill(this.registrationState.username);
		await this.passwordInput.fill(this.registrationState.password);
		await this.loginButton.click();
	}

	async verifyAccountsOverviewPage() {
		await expect(this.page.getByText(/Accounts Overview/i)).toBeVisible();
	}

	async captureAccountBalance() {
		const balanceLocator = this.page
			.locator('td, th, span, div')
			.filter({ hasText: /^\$?\d[\d,]*(?:\.\d{2})?$/ })
			.first();

		this.registrationState.accountBalance = (await balanceLocator.textContent())?.trim() ?? '';
		await expect(balanceLocator).toBeVisible();
	}

	printAccountBalance() {
		console.log(`Account balance: ${this.registrationState.accountBalance}`);
	}
}
