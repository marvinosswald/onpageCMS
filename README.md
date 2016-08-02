# Onpage CMS [Demo](http://onpagecms.marvinosswald.de)

**ALPHA** Things can and will break...

## Install
```
    'providers' = [
    ...
        marvinosswald\OnpageCMS\Providers\OnpageCMSServiceProvider::class
    ]
```
### Setup
Right now you will need to setup a few things before you can start.
#### Database
Please migrate the cms table.
#### Routing
The frontend overlay expects to send requests as PUT to `api/cms` as of now this is hardcoded.
- *PUT* `api/cms` => `'\marvinosswald\OnpageCMS\Controllers\CMSController@updateBlock'`

I don't publish a routing for it myself so you can setup authentication as you wish for example like this:
```php
Route::put('api/cms',['middleware' => ['jwt.auth'], 'uses' => '\marvinosswald\OnpageCMS\Controllers\CMSController@updateBlock']);
```

#### Authentication
The frontend overlay provides a login modal, therefor you need to provide a function which returns a token like `{"token":"ABCYXZ"}`

The Frontend expects to get a token with a `POST` Request at `/api/cms/login` you get the following fields as payload: `email,password`

#### Frontend
You need to setup a loader script there is one included `vendor/marvinosswald/OnpageCMS/resources/assets/js/opCMSLoader.js` you may just want copy the content into your `app.js` or whatsoever because `loader.uri` and `loader.element` should be customized
- loader.**element** points to an id which acts as an activator for the overlay
- loader.**uri** must point to `opCMS.js` it gets copied to your public path something like `public/opcms/js/opCMS.js`


## Usage

For instance you need to inject the cms directive into your view like:

`@inject('cms', 'marvinosswald\OnpageCMS\Services\CMS')`

Define cms blocks in your views. There are two types of block right now:

### text()

```php
   {!! $cms->text()->Title() !!}
```
**Output:**
 ``` html
    <cms id="cms-en-#-Title"></cms>
```
### meta()
Use the function call to set the name attribute like:
``` php
   {!! $cms->meta()->description() !!}
```
 **Output:**
 ``` html
 <meta id="cms-en-#-meta-description" class="cms-meta" name="description" content="">
 ```
#### Functions

##### Title()
 Generates a Title Tag like:
 ```php
    {!! $cms->meta()->title() !!}
 ```
 **Output:**
 ``` html
 <title id="cms-en-#-meta-title" class="cms-meta"></title>
 ```