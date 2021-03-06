import { select } from "d3-selection";
import { json } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { format } from "d3-format";
import { line } from "d3-shape";
import { drawChart } from "./modules/DrawChart"


const d3 = {
    select,
    json,
    scaleLinear,
    max,
    axisBottom,
    axisLeft,
    format,
    line
};

const url_cn =
  "https://opendata.cbs.nl/ODataApi/odata/81271ned/TypedDataSet?$filter=Landen eq 'L008575'";
const url_uk =
  "https://opendata.cbs.nl/ODataApi/odata/81271ned/TypedDataSet?$filter=Landen eq 'L008776'";

Promise.all([
    d3.json(url_cn),
    d3.json(url_uk)
])
.then(([data_cn, data_uk]) => {
    

    const ID = "#chart";
    const div = d3.select(ID)
    const variables = ["Invoerwaarde_1", "Uitvoerwaarde_2"];
    const labels = ["Import", "Export"];
    const xLabel = "Year"
    const yLabel = "Euro(Billions)"
   
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const colours = ["#005EB8", "#ff7f00"]
    console.log(data_cn);
    
    drawChart(div, "uk", data_uk.value, variables, labels, xLabel, yLabel, "Dutch import and export in Goods - UK", margin, colours);
    drawChart(div, "cn", data_cn.value, variables, labels, xLabel, yLabel, "Dutch import and export in Goods- China", margin, colours);
    // resize code from: https://developer.mozilla.org/en-US/docs/Web/Events/resize
    (function () {
        var throttle = function (type, name, obj) {
            obj = obj || window;
            var running = false;
            var func = function () {
                if (running) { return; }
                running = true;
                requestAnimationFrame(function () {
                    obj.dispatchEvent(new CustomEvent(name));
                    running = false;
                });
            };
            obj.addEventListener(type, func);
        };

        /* init - you can init any event */
        throttle("resize", "optimizedResize");
    })();
    let basewidth = window.innerWidth;
    // handle event
    window.addEventListener("optimizedResize", function () {
        let newwidth = window.innerWidth;
        console.log([basewidth, newwidth]);
        if(basewidth != newwidth){
            basewidth = newwidth;
            div.html("");
            drawChart(div, "uk", data_uk.value, variables, labels, xLabel, yLabel, "Dutch import and export in Goods - UK", margin, colours);
            drawChart(div, "cn", data_cn.value, variables, labels, xLabel, yLabel, "Dutch import and export in Goods- China", margin, colours);
        }
        
    });
     
    
});

