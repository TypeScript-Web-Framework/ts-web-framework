"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Annotations_1 = require("../annotations/Annotations");
const Settings_1 = require("../core/Settings");
const Controller_1 = require("../core/Controller");
let IndexController = class IndexController extends Controller_1.Controller {
    main() {
        this.httpOk(Settings_1.Settings.settings);
    }
};
IndexController = __decorate([
    Annotations_1.Route("/index"),
    Annotations_1.Method(Annotations_1.Methods.GET),
    Annotations_1.Permission(Annotations_1.Permissions.READ)
], IndexController);
exports.IndexController = IndexController;
