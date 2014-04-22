Follow [@jimheising](https://twitter.com/jimheising) for updates and news related to HAPI

# HAPI - The Humanized API

![logo](https://raw.github.com/jheising/HAPI/master/Logo/HAPI-128.png)

The goal of HAPI is to define a standard for creating Web-based APIs that are machine ready but human/developer friendly.
HAPI attempts to accomplish this by adhering to the following principles:

1. A HAPI should be accessible through a URL with nothing more than a standard web browser.
2. All inputs and outputs to a HAPI should generally be readable in a sentence form.
3. A HAPI should be self-documenting and generally understandable by non-technical people.

Here's an example of HAPIness:

**A HAPI request URL**
```
https://api.dohmain.com/create/donut/with/?filling=jelly
```

**A HAPI response**
```json
{ "this": "succeeded", "by": "creating", "the": "donut", "with": { 
  "id": "mmmmm_donut_01", 
  "filling": "jelly" 
} }
```

### Why?

One might ask, why should an API be humanized? Answer: it saves an immense amount of time.

Imagine asking another developer or end-user to help debug a traditional REST API call— the process will typically require some sort of specialized client software (like curl for example) capable of setting HTTP verbs, headers and request bodies. The instructions to make a simple call might range from a few lines for a seasoned developer to a few pages for a layperson. Add this inefficiency up for an entire project and it equals a whole lot of wasted time.

HAPI solves this problem by reducing all operations to simple requests that can be initiated and read by any standard web browser. API calls are reduced from a series of instructions into a single, self-documenting URL that can be clicked from an Email, chat, blog post (or anything else) with results that are simple enough to be read back over the phone in plain english.

## Requests

### General Rules

1. A HAPI *must* support the HTTP GET verb on all operations. Any other verb may be supported as well.
2. A HAPI *must not* require any HTTP headers above and beyond what a standard web browser will send.
3. A HAPI *should* strive to keep all input parameters within the URL of the request and not require any content within the HTTP request body.
4. For requests with content (e.g. files) that cannot be sent through a URL, the HAPI *should* render an HTML page with a form to submit the content.
6. A HAPI *must not* leverage cookies for security authentication purposes, as this could lead to phishing attacks.

### URLs

URLs to access the operations on a HAPI are meant to generally follow the structure of an english sentence so as to be easily memorized and recalled without having to consult documentation.

#### CRUD Operations

URLs for CRUD (Create, Read, Update, Delete) operations *should* adhere to the following forms:

(Note: spaces have been added for readability)

Read (all): `https://api.` **[domain]** `/ get / all /` **[resource_type]**

Read (query): `https://api.` **[domain]** `/ get / all /` **[resource_type]** `/ where / ?` **[parameters]**

Read (specific): `https://api.` **[domain]** `/ get /` **[resource_type]** `/ called /` **[resource_id]**

Create: `https://api.` **[domain]** `/ create /` **[resource_type]** `/ with / ?` **[parameters]**

Update: `https://api.` **[domain]** `/ change /` **[resource_type]** `/ called /` **[resource_id]** `/ to / ?` **[parameters]**

Delete: `https://api.` **[domain]** `/ delete /` **[resource_type]** `/ called /` **[resource_id]**

Where:

**[domain]**: The domain name of the HAPI. While HAPIs should generally not be segmented into separate sub-domains, it is acceptable to prefix the domain with a sub-domain for purposes of staging, and testing environments such as: *api.staging.mydomain.com*.

**[resource_type]**: The name of a type of resource, like *employee* or *post*. A HAPI *should* support and treat the singular and plural form of the resource type as equal. For example, *employee* and *employees* will both be valid and considered equal.

**[resource_id]**: The unique ID or name of a resource, like *2a89ef* or *fritz_734*.

**[parameters]**: Any parameters required to complete the request in standard name/value pair format for HTTP query params.

Examples:

```
https://api.dohmain.com/create/donut/with/?filling=jelly

https://api.dohmain.com/get/all/donuts

https://api.dohmain.com/get/all/donuts/with/?filling=jelly

https://api.dohmain.com/get/donut/called/mmmmm_donut_01

https://api.dohmain.com/change/donut/called/mmmmm_donut_01/to/?filling=custard

https://api.dohmain.com/delete/donut/called/mmmmm_donut_01
```

#### Other Operations

Other operations are beyond the scope of this spec, but should generally follow the guidelines of all other requests by being human readable in a sentence form. For example:

```
https://api.dohmain.com/start/a/session/for/?username=homer&password=mrplow
```

## Responses

Responses to HAPI operations are meant to generally follow the structure of an english sentence so as to be easily understood by a layperson.

### General Rules

1. A HAPI *must* return all important content to a request in the body of the HTTP response.
2. A HAPI *may* return HTTP headers that set cookies for tracking purposes, but not for security purposes. Other headers are fine as long as they aren't required to understand or generally use the API.
3. A HAPI *must* return content in JSON formatted text as a default response to any operation. Other formats may be supported as needed.

### Results

Results will be returned as JSON formatted text with an HTTP response code of type 200.

The response *should* adhere to the following form:

```json
{ "this": "succeeded", "by": "[verb]", "the": "[resource_type]", "with": [data] }
```

Where:

**[verb]**: A "past-tense-like" form of the verb (technically a factitive gerund derived from the verb) describing the operation of the request. The value should be composed of the same root word as the one in the request URL. Examples: *getting*, *creating*, *deleting*, *changing*, *opening*, *logging in*, etc.

**[resource_type]**: The name of a type of resource, like *employee* or *post*. The HAPI *should* return the same singular or plural form of the resource type passed in the request.

**[data]**: The JSON representation of an object or array containing the important content being returned from the HAPI. In the case of operations that generally do not return data (like DELETE), this might contain the unique ID of the resource being deleted. This spec does not concern the actual conventions used to represent this data (other than it being JSON), but generally it should keep within the spirit of this spec by remaining clear and easily understood by the layperson.

Examples:

```
https://api.dohmain.com/create/donut/with/?filling=jelly
```
```json
{ "this": "succeeded", "by": "creating", "the": "donut", "with": { "id": "mmmmm_donut_01", "filling": "jelly" } }
```

```
https://api.dohmain.com/get/all/donuts
```
```json
{ "this": "succeeded", "by": "getting", "the": "donuts", "with": [
  { "id": "mmmmm_donut_01", "filling": "jelly" },
  { "id": "mmmmm_donut_02", "filling": "custard" }
] }
```
```
https://api.dohmain.com/delete/donut/called/mmmmm_donut_01
```
```json
{ "this": "succeeded", "by": "deleting", "the": "donut", "with": { "id": "mmmmm_donut_01" } }
```

### Errors

Errors will be returned as JSON formatted text with an HTTP response code that matches as close as possible to the type of error being returned.

The response *should* adhere to the following form:

```json
{ "this": "failed", "with": [error_code], "because": "[error_message]" } 
```

Where:

**[error_code]**: A numerical error code for easy parsing by machines. This may or may not be different than the HTTP response code.

**[error_message]**: A human readable error message.

Example:

```json
{ "this": "failed", "with": 5600, "because": "donuts with holes can't contain jelly" }
```

## Security

The HAPI spec does not define a process for handling security, but makes recommendations on how to implement security that is HAPI in nature. The following process is an example:

Provide a HAPI operation to generate a session token with a URL like:
```
https://api.dohmain.com/start/a/session/for/?username=homer&password=mrplow
```

If you have concerns with passing a username and password via a GET request, then it is entirely acceptable to utilize HTTP basic, digest or other forms of authentication in which a user is easily prompted for their credentials in a standard web browser.

The previous HAPI request would respond by returning an object with a session-token like:

```json
{ "this": "succeeded", "by": "creating", "a": "session", "with": { "session_token": "ed68368f5ff54a00a9891858013a317b" } }
```

All other HAPI operations would accept the `session_token` parameter for authentication purposes.

#### Cookies

It is important that you **DO NOT** use cookies to store security credentials. Because HAPIs must support the GET verb on all requests, if you were to utilize a cookie for authentication a hacker could exploit this by encouraging a user to click on a link that could cause data to become modified without the user taking affirmative action to do so.

#### Confirmation Methods
Because HAPI is meant to make things easy it might still be possible to trick some users into unknowingly modifying or deleting data even if cookies aren't used. One possible way to combat against this is to implement a confirmation response for methods that delete or modify data, such as:

```json
{ "this": "donut will be DELETED", "by": "visiting", "a": "url", "with": "https://api.dohmain.com/delete/donut/called/mmmmm_donut_01?confirm=soIU98sh17" }
```

In this case, the user is prompted to call another URL with a temporary token in order to confirm the action to delete or modify the data. While this might be considered an unnecessary step when the API is being called by a machine, remember, HAPI does preclude you from supporting the DELETE verb-- in this case a machine might directly call the API with a DELETE verb and not be required to go through this extra step.

#### Crawlers and Pre-Fetching

Since the GET verb must be supported on all API calls, one concern that some bring up is the accidental deletion or modification of data by a crawler or a browser with pre-fetching. As long as the HAPI utilizes some form of valid authentication scheme, this should never become a problem in reality.

No API (HAPI, REST or otherwise) should ever consider the HTTP request verb as a security feature and assume that crawlers will only send GET requests.

While pre-fetching is still in the early stages of drafts, all currently known implementations require some form of positive activation by the developer, usually with an HTML tag which specifically states the pages which should be fetched. As long as the developer does not actively take steps to pre-fetch pages which might delete or modify data, this should not be an issue.
