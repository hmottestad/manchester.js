


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
        return this.subClasses(data[uri])
    }

    subClasses(obj){
        console.log(obj)


        for(let i of obj["http://www.w3.org/2000/01/rdf-schema#subClassOf"]){

            var restriction = i["@type"].some(function(val){return val == "http://www.w3.org/2002/07/owl#Restriction"});

            if(restriction){
                var res = Restriction.factory(i);
                return res.toString();
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

        if(obj["http://www.w3.org/2002/07/owl#maxQualifiedCardinality"] != null){
            console.log("HERE")
            return MaxQualifiedCardinalityRestriction.factory(ret);
        }




        return ret;
    }

    toString(){
        return this.obj;
    }

}


class CardinalityRestriction {

    constructor(res){
        this.obj = res.obj;
        this.onProperty = this.obj["http://www.w3.org/2002/07/owl#onProperty"][0]["@id"];

    }


}

class MaxCardinalityRestriction extends CardinalityRestriction{

    constructor(res){
        super(res)
        this.maxCardinality = this.obj["http://www.w3.org/2002/07/owl#maxCardinality"][0]["@value"];

    }

    static factory(res){
        return new MaxCardinalityRestriction(res);
    }

    toString(){
        return "<"+this.onProperty+"> max "+this.maxCardinality;
    }


}

class MaxQualifiedCardinalityRestriction  extends CardinalityRestriction{

    constructor(res){
        super(res);
        this.maxCardinality = this.obj["http://www.w3.org/2002/07/owl#maxQualifiedCardinality"][0]["@value"];
        this.onDataRange = this.obj["http://www.w3.org/2002/07/owl#onDataRange"][0]["@id"];


    }

    static factory(res){
        return new MaxQualifiedCardinalityRestriction(res);
    }

    toString(){
        return "<"+this.onProperty+"> max "+this.maxCardinality + " <"+this.onDataRange+">";
    }


}


$.get( "examples/simple.jsonld", function( data ) {




    jsonld.expand( "http://localhost:8080/examples/simple.jsonld", function(err, expanded){

        var temp = new JsonLdHelper;

        console.log(err)

        var linked = temp.link(expanded);

        var test = new Manchester;
        console.log(linked);

        document.getElementById("log").innerHTML =
            document.getElementById("log").innerHTML +
            "<li><pre>"+
            test.print(linked, "http://example.com/ont/D").replace("<", "&lt;").replace(">","&gt;").replace("<", "&lt;").replace(">","&gt;")+
            "</pre></li>";

    })
});








