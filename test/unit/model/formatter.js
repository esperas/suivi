sap.ui.require(
	[
		"ecole/famille/model/formatter",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit",
        "sap/ui/core/format/NumberFormat",
        "sap/m/library",
        "sap/m/ObjectStatus"
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
            assert.strictEqual(fnIsolatedFormatter("P"), "Facture partiellement réglé", "The long text for status P is correct");
            assert.strictEqual(fnIsolatedFormatter("Z"), null, "The long text for status Z is correct");
			assert.strictEqual(fnIsolatedFormatter(undefined), null, "The long text for status Undefined is correct");
            assert.strictEqual(fnIsolatedFormatter(null), null, "The long text for status Null is correct");
		});
		QUnit.test("Formatage du montant suivant facture ou paiement", function (assert) {
			// Arrange
			var	oViewStub = {
				getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.montant.bind(oControllerStub);
			// Assert
            assert.ok(parseFloat(fnIsolatedFormatter(1000,0))<0, "Facture en négatif");
			assert.ok(parseFloat(fnIsolatedFormatter(0,1000))>0, "Paiement en positif");
		});
        QUnit.test("Formatage du solde", function (assert) {
			// Arrange
			var	oViewStub = {
				getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.soldeDisplay.bind(oControllerStub);
			// Assert
            var regex = /Solde/;
            assert.ok(regex.test(fnIsolatedFormatter(1000)), "Solde : est bien ajouté au formatge");
		});
        QUnit.test("Pas de texte affiché sous le montant", function (assert) {
			// Arrange
			var	oViewStub = {
				getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.isStatusVisible.bind(oControllerStub);
			// Assert
            assert.strictEqual(fnIsolatedFormatter("X"), true, "X : Texte visible");
            assert.strictEqual(fnIsolatedFormatter("N"), true, "N : Texte visible");
            assert.strictEqual(fnIsolatedFormatter("R"), true, "R: Texte visible");
            assert.strictEqual(fnIsolatedFormatter("P"), true, "P : Texte visible");
            assert.strictEqual(fnIsolatedFormatter("Z"), false, "Z : Texte visible");
            assert.strictEqual(fnIsolatedFormatter(null), false, "Null : Texte non visible");
            assert.strictEqual(fnIsolatedFormatter(undefined), false, "Undefined : Texte non visible");
		});
        QUnit.test("Couleur du texte", function (assert) {
			// Arrange
			var	oViewStub = {
				getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.isStatusState.bind(oControllerStub);
			// Assert
            assert.strictEqual(fnIsolatedFormatter("X"), sap.ui.core.ValueState.Success, "X : Vert");
            assert.strictEqual(fnIsolatedFormatter("N"), sap.ui.core.ValueState.Warning, "N : Orange");
            assert.strictEqual(fnIsolatedFormatter("R"), sap.ui.core.ValueState.Error, "R: Rouge");
            assert.strictEqual(fnIsolatedFormatter("P"), sap.ui.core.ValueState.Warning, "P : Orange");
            assert.strictEqual(fnIsolatedFormatter("Z"), sap.ui.core.ValueState.None, "Z : Pas de couleur");
            assert.strictEqual(fnIsolatedFormatter(null), sap.ui.core.ValueState.None, "Null : Pas de couleur");
            assert.strictEqual(fnIsolatedFormatter(undefined), sap.ui.core.ValueState.None, "Undefined : Pas de couleur");
		});
        QUnit.test("Item navigable", function (assert) {
			// Arrange
			var	oViewStub = {
				getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.navigation.bind(oControllerStub);
			// Assert

            assert.ok(fnIsolatedFormatter(1000)==sap.m.ListType.Navigation, "Ok pour piece numérique");
            assert.ok(fnIsolatedFormatter("AZERTY")==sap.m.ListType.Navigation, "Ok pour piece alpha");
            assert.ok(fnIsolatedFormatter(null)==sap.m.ListType.Active, "KO pour Null pas de piece");
            assert.ok(fnIsolatedFormatter(undefined)==sap.m.ListType.Active, "KO pour Undefined pas de piece");
        });
        QUnit.test("Extraction du mois correcte", function (assert) {
			// Arrange
			var	oViewStub = {
				getModel: this.stub().withArgs("i18n").returns(this._oResourceModel)
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.extractMonth.bind(oControllerStub);
			// Assert

            assert.ok(fnIsolatedFormatter("201609")=="septembre", "Ok pour octobre");
            assert.ok(fnIsolatedFormatter("201601")=="janvier", "Ok pour janvier");
        });
	}
);
