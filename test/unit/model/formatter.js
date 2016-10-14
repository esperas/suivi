sap.ui.require(
	[
		"ecole/famille/model/formatter",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	],
	function (formatter, ResourceModel) {
		"use strict";
		QUnit.module("Formatting functions", {
			beforeEach: function () {
				this._oResourceModel = new ResourceModel({
					bundleUrl : jQuery.sap.getModulePath("ecole.famille", "/i18n/i18n.properties")
				});
			},
			afterEach: function () {
				this._oResourceModel.destroy();
			}
		});
		QUnit.test("Should return the translated texts", function (assert) {
			// Arrange
			var	oViewStub = {
				getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.isStatusText.bind(oControllerStub);
			// Assert
			assert.strictEqual(fnIsolatedFormatter("N"), "Nouvelle facture", "The long text for status N is correct");
			assert.strictEqual(fnIsolatedFormatter("X"), "Facture réglé", "The long text for status X is correct");
			assert.strictEqual(fnIsolatedFormatter("R"), "Facture en retard", "The long text for status R is correct");
			assert.strictEqual(fnIsolatedFormatter(undefined), null, "The long text for status Undefined is correct");
            assert.strictEqual(fnIsolatedFormatter(null), null, "The long text for status Null is correct");
		});
		QUnit.module("Formatting functions occitan", {
			beforeEach: function () {
				this._oResourceModel = new ResourceModel({
					bundleUrl : jQuery.sap.getModulePath("ecole.famille", "/i18n/i18n_oc.properties")
				});
			},
			afterEach: function () {
				this._oResourceModel.destroy();
			}
		});
		QUnit.test("Should return the occitan text texts", function (assert) {
			// Arrange
			var	oViewStub = {
				getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.isStatusText.bind(oControllerStub);
			// Assert
			assert.strictEqual(fnIsolatedFormatter("N"), "Neo factura", "The long text for status N is correct");
			assert.strictEqual(fnIsolatedFormatter("X"), "Factura pagad", "The long text for status X is correct");
			assert.strictEqual(fnIsolatedFormatter("R"), "Factura retarda", "The long text for status R is correct");
			assert.strictEqual(fnIsolatedFormatter(undefined), null, "The long text for status Undefined is correct");
            assert.strictEqual(fnIsolatedFormatter(null), null, "The long text for status Null is correct");
		});
	}
);
