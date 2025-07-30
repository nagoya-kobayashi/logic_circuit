$(function() {
    var {input, output, lead, branch, semiconductor} = buildCircuit();

    var objects = [];
    input.forEach(function(value){objects.push(value);});
    output.forEach(function(value){objects.push(value);});
    lead.forEach(function(value){objects.push(value);});
    branch.forEach(function(value){objects.push(value);});
    semiconductor.forEach(function(value){objects.push(value);});
    
    for(i=0; i<objects.length; i++){
        objects[i].id=i;
        objects[i].class=objects[i].constructor.name;
    }
    
    cols = ["id","class","x","y","sx","sy","ex","ey","label","status"];

    var data = [];
    var line = [];

    for(i=0; i<objects.length; i++){
        line=[];
        //line.push(objects[i].constructor.name);
        cols.forEach(function(value){
            if(objects[i][value] != null){ line.push(objects[i][value]);} else { line.push("-");}
        });
        if(objects[i].in1 != null){ line.push(objects[i].in1.id);} else { line.push("-");}
        if(objects[i].in2 != null){ line.push(objects[i].in2.id);} else { line.push("-");}
        if(objects[i].out1 != null){ line.push(objects[i].out1.id);} else { line.push("-");}
        if(objects[i].out2 != null){ line.push(objects[i].out2.id);} else { line.push("-");}
        data.push(line);
    }
    

/*
    document.writeln("<table border=1>");
    document.writeln("<tr>");
    cols.forEach(function(token){
        document.writeln("<th>");
            document.writeln(token);
        document.writeln("</th>");
    });
    document.writeln("<th>","in1","</th>");
    document.writeln("<th>","in2","</th>");
    document.writeln("<th>","out1","</th>");
    document.writeln("<th>","out2","</th>");
    document.writeln("</tr>");
    data.forEach(function(value){
        document.writeln("<tr>");
        value.forEach(function(token){
            document.writeln("<td>");
                document.writeln(token);
            document.writeln("</td>");
        });
        document.writeln("</tr>");
    });
    document.writeln("</table>");

*/
    csv="";
    data.forEach(function(value){
        value.forEach(function(token){
            csv = csv + token + ",";
        });
        csv = csv + "\n";
    });
    const blob = new Blob([csv], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circuit_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
