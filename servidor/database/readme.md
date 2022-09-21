## Actores:

Usuario de la app

## Entidades

Figuritas

## Usuario

#### Figurita

```json
{
  "id": 6,
  "nombre": "Alicia",
  "categoria": "Colombia",
  "url": "google.com",
  "tengo": false,
  "cantidad": null
}
```

#### Como usuario deseo poder ver todas mis figuritas que tengo

#### `GET: /figuritas`

Status: Si hay figurita: \*\*200 OK

```json
[
  {
    "id": 2,
    "categoria": "Uru",
    "tengo": false
  }
]
```

#### El usuario puede marcar las figuritas que consiga

#### `PUT: /figuritas?id={id}&tengo={tengo}`

Status: Si hay figurita: \*\*201 OK

```json
{
  "id": 5,
  "categoria": "Peru",
  "tengo": false,
  "cantidad": null
}
```

#### Como usuario deseo poder ver las repetidas

#### `PUT: /figuritas?id={id}&tengo={tengo}&cantidad={cantidad}`

Formato: **JSON**

Status: **202 ACCEPTED**.

```json
[
  {
    "id": 5,
    "categoria": "Colombia",
    "tengo": true,
    "cantidad": null
  }
]
```
