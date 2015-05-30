
var input = {
    "@graph" : [ {
        "@id" : "_:b0",
        "@type" : "owl:Restriction",
        "maxCardinality" : "1",
        "onProperty" : "http://example.com/prop"
    }, {
        "@id" : "http://example.com/A",
        "@type" : "owl:Class",
        "subClassOf" : "_:b0"
    }, {
        "@id" : "http://example.com/prop",
        "@type" : "owl:ObjectProperty"
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

class JsonLdHelper {

    link(data) {

        var ret = {};
        for (let v of data) {
            ret[v['@id']] = v;
        }

       for(var i in ret){
           var temp = ret[i];
           for(var ii in temp){
               for(var iii in temp[ii]){
                   if(temp[ii][iii]["@id"] != null){
                       temp[ii][iii] = ret[temp[ii][iii]["@id"]]
                   }
               }
           }
       }


        return ret;

    }


}

class Manchester {


    print(data, uri) {
        this.subClasses(data[uri])
    }

    subClasses(obj){
        console.log(obj)

        for(let i of obj["http://www.w3.org/2000/01/rdf-schema#subClassOf"]){

            var restriction = i["@type"].some(function(val){return val == "http://www.w3.org/2002/07/owl#Restriction"});

            if(restriction){
                var res = Restriction.factory(i);
                console.log(res.toString())
            }


        }

    }


}

class Restriction{


    constructor(obj){
        this.obj = obj;
        console.log(obj)


    }

    static factory(obj){
        var ret = new Restriction(obj);

        if(obj["http://www.w3.org/2002/07/owl#maxCardinality"] != null){
            return MaxCardinalityRestriction.factory(ret);
        }

        return ret;
    }

    toString(){
        return this.obj;
    }

}

class MaxCardinalityRestriction{

    constructor(res){
        this.obj = res.obj;
        this.maxCardinality = this.obj["http://www.w3.org/2002/07/owl#maxCardinality"][0]["@value"];
        this.onProperty = this.obj["http://www.w3.org/2002/07/owl#onProperty"][0]["@id"];

    }

    static factory(res){
        return new MaxCardinalityRestriction(res);
    }

    toString(){
        return "<"+this.onProperty+"> max "+this.maxCardinality;
    }


}






jsonld.expand(input, function(err, expanded){

    var temp = new JsonLdHelper;
    var linked = temp.link(expanded);

    var test = new Manchester;
    console.log(test.print(linked, "http://example.com/A"));


})