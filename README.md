# SpIRiT

![SpIRiT Wordmark](https://i.imgur.com/EwHyJMs.png)

## Overview 

The SpIRiT© of Occupational Therapy, a process developed by Stackhouse & Graf,  was set up as a clinical reasoning tool to help pediatric therapists 'connect the dots' between how the brain is working or not working in the ways that kids learn, play and develop. The application of the process itself originally involved connecting attributes on multiple pieces of paper using thread, establishing how different parts of the brain were connected. SpIRiT© has been taught to several occupational therapists all over the world, allowing them to establish a clearer picture of where a child may need help. Unfortunately, the way it was constructed forced therapists to rely on paper charts and tangled thread, all while observing children.

Hugh Hartigan and Rob Morgan saw this as an opportunity to take this incredibly valuable technique and modernize it, allowing therapists to have quicker access to the process itself, as well as making it more organized and easier to learn. Because of the immense amount of data, the process already involves, we opted to use Redux on the frontend and a Node.js server on the backend. The UI/UX is as clean and intuitive as possible, allowing the therapist to easily navigate through the treatment process, while still providing them help along the way. Definitions are provided for unfamiliar terms, printouts are available for completed sessions, graphs show progress from one session to the next, and the app conditionally highlights particular areas to simulate the 'thread connections' of the original process.

## Area of Focus

Our area of focus was to make this app as accessible as possible, while still maintaining the integrity of the process itself. Our client's, Tracy Stackhouse and Angela Graf, put an immense amount of time and effort into developing SpIRiT© in order to help children and we wanted to make sure that dedication wasn't lost in our application. Prior to and during development, we met with them several times to make sure each and every feature they wanted was accounted for and implemented accordingly.

Management of state and data was also crucial, which is where keen attention toward the structure of our Redux store and Node.js schemas came into play. With over 150+ pieces of data to potentially account for in a single session, a consistent and predictable flow of data was incredibly important. We spent a large portion of our time making sure that every possible piece of data was trackable and had its place in our Redux store and back-end database.

# SpIRiT Backend Endpoints

This area outlines all of the endpoints for the SpIRiT backend, as well as the necessary request parameters (if any) and expected responses.

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
