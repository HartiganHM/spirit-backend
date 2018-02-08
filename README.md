# spirit-backend

## GET

### Endpoint
```shell
GET /api/v1/terms/all
```

#### Response
Returns all terms.

```json
Status: 200 OK

[
  {
    "id": 133,
    "term": "JRC/AR",
    "definition": "This is the abbreviation for Just Right Challenge and Adaptive Response. Since we are utilizing and ASI© model as one foundational frame of reference, the treatment plan needs to include mindful decisions about how the therapists might guide the JRC and what AR's are noted.  This is where you should note what treatment was offered and what the response was.  In the treatment planning section, do this related to the STEPSI© components.",
    "imageURL": "",
    "category_name": "Spirit",
    "category_id": 8
  },
  {
    "id": 137,
    "term": "Tactile",
    "definition": "Receptors located in the skin/dermis to detect quality of touch (+-) as well as detail, quality, location, intensity, duration and meaning of the input.",
    "imageURL": "",
    "category_name": "Sensory Systems",
    "category_id": 9
  }
]
```

### Endpoint
```shell
GET /api/v1/categories/all
```

#### Response
Returns all categories.

```json
Status: 200 OK

[
  {
    "id": 1,
    "name": "Spirit"
  },
  {
    "id": 2,
    "name": "Sensory Systems"
  },
  {
    "id": 3,
    "name": "Modulation"
  },
  {
    "id": 4,
    "name": "Posture"
  },
  {
    "id": 5,
    "name": "Social/Emotional Development"
  },
  {
    "id": 6,
    "name": "Sensory Discrimination"
  },
  {
    "id": 7,
    "name": "Executive Functioning"
  }
]
```

### Endpoint
```shell
GET /api/v1/categories/:category_id/terms
```

#### Response
Returns all terms for a specified category.

```json
Status: 200 OK

[
  {
    "id": 37,
    "term": "M in S-A-M: Motor",
    "definition": "High: Motor Planning Executive system, Low: Automatic postural and motor functions",
    "imageURL": "",
    "category_name": "Spirit",
    "category_id": 1
  },
  {
    "id": 33,
    "term": "JRC/AR",
    "definition": "This is the abbreviation for Just Right Challenge and Adaptive Response. Since we are utilizing and ASI© model as one foundational frame of reference, the treatment plan needs to include mindful decisions about how the therapists might guide the JRC and what AR's are noted.  This is where you should note what treatment was offered and what the response was.  In the treatment planning section, do this related to the STEPSI© components.",
    "imageURL": "",
    "category_name": "Spirit",
    "category_id": 1
  }
]
```

### Endpoint
```shell
GET /api/v1/terms/:terms_id
```

#### Response
Returns a term by specified id.

```json
Status: 200 OK

[
  {
    "id": 100,
    "term": "Ocular",
    "definition": "There are four basic types of eye movements, saccades, smooth pursuit, vergence(con and di), and vestibulo-ocular movements.",
    "imageURL": "",
    "category_name": "Sensory Discrimination",
    "category_id": 6
  }
]

```

### Endpoint
```shell
GET /api/v1/terms?term=<term name>
```

#### Response
Returns a term by specified id.

```json
Status: 200 OK

[
  {
    "id": 257,
    "term": "Planning",
    "definition": "The neurological processes involved in the formulation, evaluation and selection of a sequence of thoughts and actions to achieve a desired goal.",
    "imageURL": "",
    "category_name": "Executive Functioning",
    "category_id": 14
  }
]

```

## POST

### Endpoint
```shell
POST /authenticate
```

#### Request
Requires email and appName in body.
```json
{ "email": "user@email.com", "appName": "myApp" }
```

#### Response
Returns unique JSON Web Token (JWT).

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
```

### Endpoint
```shell
POST /api/v1/categories/:category_id/terms
```

#### Request
Requires term and definition in body.
```json
{ "term": "Sample Term", "definition": "Sample Definition!" }
```

#### Response
Returns new term id.

```json
Status: 201 OK

[
   146
]

```

### Endpoint
```shell
POST /api/v1/categories
```

#### Request
Requires name in body.
```json
{ "name": "Sample name" }
```

#### Response
Returns new category id.

```json
Status: 201 OK

[
   9
]

```

## PUT

### Endpoint
```shell
PUT /api/v1/terms/:terms_id
```

#### Request
Will update any term property of terms_id.
```json
{ "definition": "New definition" }
```

#### Response
Returns confirmation of updated terms_id.

```json
Status: 201 OK

{
   "success": "Term 130 updated."
}

```

### Endpoint
```shell
PUT /api/v1/categories/:category_id
```

#### Request
Will update any category name by category_id.
```json
{ "name": "New name" }
```

#### Response
Returns confirmation of updated category_id.

```json
Status: 201 OK

{
   "success": "Category 7 updated."
}

```

## DELETE

### Endpoint
```shell
DELETE /api/v1/terms/:terms_id
```

#### Request
Will delete term by terms_id.

#### Response
Returns confirmation of deleted id.

```json
Status: 204 OK

{
   "success": "Term 118 deleted."
}

```

### Endpoint
```shell
DELETE /api/v1/categories/:category_id
```

#### Request
Will delete category by category_id.

#### Response
Returns confirmation of deleted id.

```json
Status: 204 OK

{
   "success": "Category 6 deleted."
}

```
