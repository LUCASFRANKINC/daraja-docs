---
title: Exceptions
description: What the package throws, and when.
---

Everything extends `Starnerz\LaravelDaraja\Exceptions\DarajaException`, which
extends `RuntimeException`. Catching the base type catches all of them.

```php
use Starnerz\LaravelDaraja\Exceptions\DarajaException;

try {
    Daraja::stk()->push('0712345678', 100, 'INV-1');
} catch (DarajaException $exception) {
    report($exception);
}
```

## ConfigurationException

Something is missing or wrong in configuration. Thrown **before** any request.

```
The [laravel-daraja.consumer_key] configuration value is required but has not been set.
Unknown Daraja mode [staging]. Supported modes are "sandbox" and "live".
The Safaricom public certificate could not be read at [/path/cert.cer]. …
```

The message always names the offending config key or path, and a missing value
ends with a link to the [configuration reference](/reference/configuration/).

## AuthenticationException

The token request failed.

```php
catch (AuthenticationException $exception) {
    // Wrong consumer key/secret, or credentials for the other environment
}
```

Also raised when Daraja answers without an `access_token`, which usually means
sandbox credentials pointed at production or vice versa. Both messages end
with a link to [Configuration](/getting-started/configuration/).

## ApiRequestException

Daraja rejected the request, or it could not be reached.

```php
catch (ApiRequestException $exception) {
    $exception->errorCode;   // '400.002.02'
    $exception->requestId;   // '11728-2929992-1'
    $exception->status;      // 400
    $exception->payload;     // decoded body
    $exception->getMessage();
}
```

The message is Safaricom's own description, unchanged, because applications
store it and sometimes show it. What explains it goes to the log instead: see
[Links in the log](#links-in-the-log).

It parses all three failure shapes Daraja uses: the flat
`errorCode`/`errorMessage` object, the SOAP-style `Envelope.Body.Fault`, and
plain text. Non-JSON bodies are truncated to 300 characters.

Connection failures surface here too:

```
Could not reach the Safaricom Daraja API: Connection timed out
```

## DarajaException

The base class is thrown directly for input the package can reject itself:

```php
// Invalid phone number
'[07123] is not a valid Safaricom mobile number. Expected a number in the form 2547XXXXXXXX.'

// C2B simulation outside sandbox
'C2B simulation is only available in the sandbox. Set [laravel-daraja.mode] to "sandbox" to use it.'

// Transaction status with no identifier
'Provide either an M-Pesa receipt number or an OriginalConversationID to query a transaction.'

// Bill Manager batch limits
'Bill Manager accepts a maximum of 1000 invoices per bulk request, 1500 given.'
```

## Links in the log

Since 5.4.0, every exception has `docsUrl()`, the page on this site that
explains it, and a `context()` method. Laravel calls `context()` when it
reports an exception and adds the result to the log entry, so the explanation
is one click from the log line:

```php
$exception->docsUrl();
// 'https://laraveldaraja.com/reference/error-codes/'

$exception->context();
// [
//     'docs' => 'https://laraveldaraja.com/reference/error-codes/',
//     'error_code' => '400.002.02',
//     'request_id' => '11728-2929992-1',
//     'status' => 400,
// ]
```

`ApiRequestException` links to [Error codes](/reference/error-codes/) and adds
whichever of the error code, request ID and status Safaricom sent.
`ConfigurationException` and `AuthenticationException` link to the
configuration pages, and the base `DarajaException` to this page.

## What is not an exception

**A failed result callback.** Those are ordinary events with
`successful() === false` — the HTTP request succeeded, the transaction did not.

**An acknowledgement with a non-zero `ResponseCode`.** Check `accepted()` on the
response object.

## Retries

Connection failures are retried automatically per `http.retries`. A 4xx is not
retried — the request was rejected and would be again.
