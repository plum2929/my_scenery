// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import HeaderController from "./header_controller"
application.register("header", HeaderController)

import ImageController from "./image_controller"
application.register("image", ImageController)

import LoginController from "./login_controller"
application.register("login", LoginController)

import MenuController from "./menu_controller"
application.register("menu", MenuController)

import SignupController from "./signup_controller"
application.register("signup", SignupController)

import TagController from "./tag_controller"
application.register("tag", TagController)

import Notification from "stimulus-notification"
application.register("notification", Notification)

import PasswordVisibility from "stimulus-password-visibility"
application.register("password-visibility", PasswordVisibility)

import ScrollTo from "stimulus-scroll-to"
application.register("scroll-to", ScrollTo)
