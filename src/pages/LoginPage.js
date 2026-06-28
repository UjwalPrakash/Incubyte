export class LoginPage {
	constructor(page) {
		this.page = page;
		this.usernameInput = page.locator('#username, #user-name, input[name="username"]');
		this.passwordInput = page.locator('#password, input[name="password"]');
		this.loginButton = page.locator('#loginButton, #login-button, input[type="submit"], button[type="submit"]');
		this.errorMessage = page.locator('#error, [data-test="error"], .error-message');
	}

}
