
[![npm version](https://badge.fury.io/js/ts-web-framework.svg)](https://badge.fury.io/js/ts-web-framework)
[![Known Vulnerabilities](https://snyk.io/test/github/olaferlandsen/ts-web-framework/badge.svg?targetFile=package.json)](https://snyk.io/test/github/olaferlandsen/ts-web-framework?targetFile=package.json)
[![dependencies Status](https://david-dm.org/olaferlandsen/ts-web-framework/status.svg)](https://david-dm.org/olaferlandsen/ts-web-framework)
[![devDependencies Status](https://david-dm.org/olaferlandsen/ts-web-framework/dev-status.svg)](https://david-dm.org/olaferlandsen/ts-web-framework?type=dev)
[![Build status](https://ci.appveyor.com/api/projects/status/ai1w0sturxu1ea0w/branch/master?svg=true)](https://ci.appveyor.com/project/olaferlandsen/ts-web-framework/branch/master)
[![Codeship Status for olaferlandsen/ts-web-framework](https://app.codeship.com/projects/04f86bc0-6361-0136-224a-06be1f03f909/status?branch=master)](https://app.codeship.com/projects/297007)
[![Build Status](https://travis-ci.org/olaferlandsen/ts-web-framework.svg?branch=master)](https://travis-ci.org/olaferlandsen/ts-web-framework)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9156773c1dc4c906d84a/test_coverage)](https://codeclimate.com/github/olaferlandsen/ts-web-framework/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/9156773c1dc4c906d84a/maintainability)](https://codeclimate.com/github/olaferlandsen/ts-web-framework/maintainability)
[![Inline docs](http://inch-ci.org/github/olaferlandsen/ts-web-framework.svg?branch=master)](http://inch-ci.org/github/olaferlandsen/ts-web-framework)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/olaferlandsen/ts-web-framework/issues)
[![HitCount](http://hits.dwyl.com/olaferlandsen/ts-web-framework.svg)](http://hits.dwyl.com/olaferlandsen/ts-web-framework)
[![GitHub issues](https://img.shields.io/github/issues/olaferlandsen/ts-web-framework.svg)](https://github.com/olaferlandsen/ts-web-framework/issues)
[![GitHub stars](https://img.shields.io/github/stars/olaferlandsen/ts-web-framework.svg)](https://github.com/olaferlandsen/ts-web-framework/stargazers)
[![GitHub license](https://img.shields.io/github/license/olaferlandsen/ts-web-framework.svg)](https://github.com/olaferlandsen/ts-web-framework/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/ts-web-framework.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ts-web-framework/)

# TypeScript Web Framework

Ideal to create Web Services.


## Requeriments
* Nodejs 6+
* TypeScript 2.8+

## Install
### Clone
```
git clone https://github.com/olaferlandsen/ts-web-framework.git
git checkout tags/v1.7.4-beta
```

### Or Download
```
wget https://github.com/olaferlandsen/ts-web-framework/archive/v1.7.4-beta.zip
```

## Features
### Security
* [x] CSRF Prevention
* [x] Expect-CT
* [x] Content Security Policy
* [x] DNS Prefetch Control
* [x] X-Frame-Options
* [x] Hiden Powerd By
* [x] HTTP Public Key Pinning
* [x] HTTP Strict Transport Security
* [x] X-Download-Options for IE8+
* [x] No Cache
* [x] No Sniff
* [x] Referrer-Policy
* [x] XSS Prevention
* [x] AES-256-CTR, AES-256-GCM, AES-256-CBC Encrypt/Decrypt implementation
* [ ] Denial-Of-Service Prevention
### Easy Custom Responses
* [x] httpOk - `200`
* [x] httpCreated - `201`
* [x] httpAccepted - `202`
* [x] httpRedirect - `301` & `307`
* [x] httpBadRequest - `400`
* [x] httpUnauthorized - `401`
* [x] httpForbidden - `403`
* [x] httpNotFound - `404`
* [x] httpMethodNotAllowed - `405`
### Cross-platform
* [x] Microsoft Windows(XP, Vista, 8, 10, ...)
* [x] Linux (Ubuntu, Centos, Fedora, RedHat, ...)
* [x] OSX




## Getting Started
### Example code
````typescript
@Api
export class CrudController extends Controller {
    @HttpPost("/profile")
    public create () {
        this.httpCreated();
    }
    
    @HttpGet("/profile/:id")
    public read () {
        this.httpOk();
    }
    
    @HttpPut("/profile/:id")
    public updtae () {
        this.httpOk();
    }
    
    @HttpDelete("/profile/:id")
    public delete () {
        this.httpOk();
    }
}
````

### Commands
#### Build
```
npm run build
```
#### Test
```
npm test
```
#### Run/Serve
```
npm run serve
```
#### Package Single Binany
```
npm run package
```


# Licence

MIT License

Copyright (c) 2018 Olaf Erlandsen C.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
