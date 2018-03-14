Follow [@jimheising](https://twitter.com/jimheising) for updates and news related to HAPI

# HAPI - The Humanized API

![logo](https://raw.github.com/jheising/HAPI/master/Logo/HAPI-128.png)

The goal of HAPI is to define a standard for creating Web-based APIs that are machine ready but human/developer friendly— a self-documenting API.
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
  }
}
```

### Why?

Question: Why should an API be humanized?
<br>
Answer: Machines consume APIs, but people still write the software that run on those machines.

Developers should write easily testable and self/well-documented code— shouldn't an API aspire to the same ideals?

HAPI addresses this problem by reducing all operations to simple requests that can be initiated and read by any standard web browser. API calls are reduced from a series of instructions into a single, self-documenting URL that can be clicked from an Email, chat, blog post (or anything else) with results that are simple enough to be read back over the phone in plain english.

### URLs

URLs to access the operations on a HAPI are meant to generally follow the structure of an english sentence so as to be easily memorized and recalled without having to consult documentation.

#### CRUD Operations

URLs for CRUD (Create, Read, Update, Delete) operations might look like:

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

## Success Responses

Responses to HAPI operations are meant to generally follow the structure of an english sentence so as to be easily understood by a layperson.

The success response *should* adhere to the following form:

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
  ]
}
```
```
https://api.dohmain.com/delete/donut/called/mmmmm_donut_01
```
```json
{ "this": "succeeded", "by": "deleting", "the": "donut", "with": { "id": "mmmmm_donut_01" } }
```

### Errors

Errors follow a similar form.

The error response *should* adhere to the following form:

```json
{ "this": "failed", "with": [error_code], "because": "[error_message]" } 
```

Where:

**[error_code]**: A machine readable error code (number or string) that might be used as an index for localized error messages.

**[error_message]**: A human readable error message in case the application does not provide a lookup mechanism for the `error_code`.

Example:

```json
{ "this": "failed", "with": "InvalidParameter", "because": "donuts with holes can't contain jelly" }
```
