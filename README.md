# manchester.js
JSON-LD Manchester Syntax renderer.

Render OWL restrictions as a Manchester Syntax string.
```
var input = {
  "@graph" : [ {
    "@id" : "_:b0",
    "@type" : "owl:Restriction",
    "maxCardinality" : "1",
    "onProperty" : "http://data.posccaesar.org/ilap/prop"
  }, {
    "@id" : "http://data.posccaesar.org/ilap/A",
    "@type" : "owl:Class",
    "subClassOf" : "_:b0"
  }, {
    "@id" : "http://data.posccaesar.org/ilap/prop",
    "@type" : "owl:ObjectProperty"
  }, {
    "@id" : "http://www.semanticweb.org/havardottestad/ontologies/2015/4/untitled-ontology-48",
    "@type" : "owl:Ontology"
  } ],
  "@context" : {
    "subClassOf" : {
      "@id" : "http://www.w3.org/2000/01/rdf-schema#subClassOf",
      "@type" : "@id"
    },
    "maxCardinality" : {
      "@id" : "http://www.w3.org/2002/07/owl#maxCardinality",
      "@type" : "http://www.w3.org/2001/XMLSchema#nonNegativeInteger"
    },
    "onProperty" : {
      "@id" : "http://www.w3.org/2002/07/owl#onProperty",
      "@type" : "@id"
    },
    "owl" : "http://www.w3.org/2002/07/owl#",
    "rdf" : "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "xml" : "http://www.w3.org/XML/1998/namespace",
    "xsd" : "http://www.w3.org/2001/XMLSchema#",
    "rdfs" : "http://www.w3.org/2000/01/rdf-schema#"
  }
};

for(var i in input['@graph']){
    var node = input['@graph'][i];
    if(node['@type'] == "owl:Restriction"){
        console.log("<"+node.onProperty+"> max "+node.maxCardinality)
    }
}

```
