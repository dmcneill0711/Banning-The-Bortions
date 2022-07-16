var map = L.map("map", {
    center: [39.8097, -98.5556],
    zoom: 3
});

function createMap(stateCapitals) {

    // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    stateCapitals.addTo(map);
  
    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
        "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the capitals.
    var overlayMaps = {
        "State Capitals": stateCapitals
    };

    const legend = L.control.Legend({
        position: "bottomleft",
        collapsed: true,
        symbolWidth: 24,
        opacity: 1,
        column: 2,
        legends: [{
            label: "Green: No Abortion Ban)",
            type: "circle",
            radius: 6,
            color: "green",
            fillColor: "green"
        }, {
            label: "Blue: No Ban Until After A Specific Week",
            type: "circle",
            radius: 6,
            color: "blue",
            fillColor: "blue"
        }, {
            label: "Yellow: No Ban Until Fetal Viability",
            type: "circle",
            radius: 6,
            color: "yellow",
            fillColor: "yellow"
        }, {
            label: "Orange: Banned After 6 Weeks Of Pregnancy",
            type: "circle",
            radius: 6,
            color: "orange",
            fillColor: "orange"
        }, {
            label: "Red: Banned",
            type: "circle",
            radius: 6,
            color: "red",
            fillColor: "red"   
        }]
    })
    .addTo(map);

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(map);

};

var capitalJson = "json/US-Capitals.json"

var geoJson = "json/gz_2010_us_040_00_500k.json"

function chooseColor(stateName, array) {

    var banned = "";

    for (var index = 0; index < array.length; index++) {
    
        if (stateName == array[index]) {
            banned = array[index+1];
        }
        index++;
    }

    if (banned == "Yes") return "red";
    else if (banned == "Yes, With Limited Exceptions") return "red";
    else if (banned == "No, Until Fetal Viability") return "yellow";
    else if (banned == "Yes, With Limited Exceptions (6 Weeks)") return "orange";
    else if (banned == "No, Until Fetal Viability (22 Weeks)") return "blue";
    else if (banned == "No, Until Fetal Viability (24 Weeks)") return "blue";
    else if (banned == "No, Until Fetal Viability (27 Weeks)") return "blue";
    else if (banned == "No") return "green";
    else return "purple";
};

var array = [];

d3.json(capitalJson).then(function(data) {

    for (var index = 0; index < data.length; index++) {
        
        array.push(data[index].state);
        array.push(data[index].banned);
    }
});

d3.json(geoJson).then(function(data) {
    console.log(array)
    L.geoJson(data, {
        style: function(feature) {
            return {
                color: "white",
                fillColor: chooseColor(feature.properties.NAME, array),
                fillOpacity: 0.5
            }
        }
    }).addTo(map)    
}); 

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function createMarkers(response) {

    //console.log(response)

    var usCapitals = response

    var babyIcon = L.icon.glyph({
        className: '',
        prefix: 'fas',
        glyph: 'baby',
        glyphColor: 'white',
        glyphSize: '24px'
    })
          
    // Initialize an array to hold capital markers.
    var capitals = [];
    
        // Loop through the array.
        for (var index = 0; index < usCapitals.length; index++) {
    
            var usCapital = usCapitals[index];

            var clinicsVsPop = numberWithCommas(Math.round(((+usCapital.population.replace(/,/g, ''))/usCapital.clinics)));

            // For each capital, create a marker, and bind a popup with the capital's name and state.
            var capital = L.marker([usCapital.lat, usCapital.lon], {
                icon: babyIcon
                }).bindPopup("<h3><b><u>Capital:</u> </b>" + usCapital.city + "</h3><h3><b><u>State:</u> </b>" + usCapital.state + "</h3><h3><b><u>State Population:</u> </b>" + usCapital.population + "</h3><h3><b><u>Number of Abortion Clinics:</u> </b>" + usCapital.clinics + "</h3><h3><b><u>Number of People Per Clinic:</u> </b>" + clinicsVsPop + " to 1</h3><h3><b><u>Will Abortion Be Banned?:</u> </b>" + usCapital.banned + "</h3>");

            // Add the marker to the capitalSite array.
            capitals.push(capital);
        }
          
        // Create a layer group that's made from the capital array, and pass it to the createMap function.
        createMap(L.layerGroup(capitals));
    
    };

d3.json("json/US-Capitals.json",function(data) {
    capitalJson = data;
    console.log(data)}).then(createMarkers);

    //console.log(capitalJson)

    L.Icon.Glyph = L.Icon.extend({
        options: {
            iconSize: [25, 41],
            iconAnchor:  [12, 41],
            popupAnchor: [1, -34],
            shadowSize:  [41, 41],
    // 		iconUrl: 'glyph-marker-icon.png',
    // 		iconSize: [35, 45],
    // 		iconAnchor:   [17, 42],
    // 		popupAnchor: [1, -32],
    // 		shadowAnchor: [10, 12],
    // 		shadowSize: [36, 16],
    // 		bgPos: (Point)
            className: '',
            prefix: '',
            glyph: 'home',
            glyphColor: 'white',
            glyphSize: '11px',	// in CSS units
            glyphAnchor: [0, -7]	// In pixels, counting from the center of the image.
        },
    
        createIcon: function () {
            var div = document.createElement('div'),
                options = this.options;
    
            if (options.glyph) {
                div.appendChild(this._createGlyph());
            }
    
            this._setIconStyles(div, options.className);
            return div;
        },
    
        _createGlyph: function() {
            var glyphClass,
                textContent,
                options = this.options;
    
            if (!options.prefix) {
                glyphClass = '';
                textContent = options.glyph;
            } else if((options.prefix === "fab") || (options.prefix === "fal") || (options.prefix === "far") || (options.prefix === "fas")) {
                // Hack for Font Awesome 5 - it needs two different prefixes.
                glyphClass = "fa-" + options.glyph;
            } else if(options.glyph.slice(0, options.prefix.length+1) === options.prefix + "-") {
                glyphClass = options.glyph;
            } else {
                glyphClass = options.prefix + "-" + options.glyph;
            }
    
            var span = L.DomUtil.create('span', options.prefix + ' ' + glyphClass);
            span.style.fontSize = options.glyphSize;
            span.style.color = options.glyphColor;
            span.style.width = options.iconSize[0] + 'px';
            span.style.lineHeight = options.iconSize[1] + 'px';
            span.style.textAlign = 'center';
            span.style.marginLeft = options.glyphAnchor[0] + 'px';
            span.style.marginTop = options.glyphAnchor[1] + 'px';
            span.style.pointerEvents = 'none';
            span.style.display = 'inline-block';
    
            if (textContent) {
                span.innerHTML = textContent;
            }
    
            return span;
        },
    
        _setIconStyles: function (div, name) {
            if (name === 'shadow') {
                return L.Icon.prototype._setIconStyles.call(this, div, name);
            }
    
            var options = this.options,
                size = L.point(options['iconSize']),
                anchor = L.point(options.iconAnchor);
    
            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }
    
            div.className = 'leaflet-marker-icon leaflet-glyph-icon ' + name;
            var src = this._getIconUrl('icon');
            if (src) {
                div.style.backgroundImage = "url('" + src + "')";
            }
    
            if (options.bgPos) {
                div.style.backgroundPosition = (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
            }
            if (options.bgSize) {
                div.style.backgroundSize = (options.bgSize.x) + 'px ' + (options.bgSize.y) + 'px';
            }
    
            if (anchor) {
                div.style.marginLeft = (-anchor.x) + 'px';
                div.style.marginTop  = (-anchor.y) + 'px';
            }
    
            if (size) {
                div.style.width  = size.x + 'px';
                div.style.height = size.y + 'px';
            }
        }
    });
    
    L.icon.glyph = function (options) {
        return new L.Icon.Glyph(options);
    };
    
    // Base64-encoded version of glyph-marker-icon.png
    L.Icon.Glyph.prototype.options.iconUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAUlSURBVFjDrZdLiBxVFIb/e289uqt6kkx6zIiIoKgLRReKuMhCcaOIAUEIiCCE4CIPggZ8kBjooPgM0TiYEUUjqBGchZqAQlyYRTA+kJiJQiJGMjN5zYzT3dP1rrr3HBeTjDGTSfc8Dvyruud89Z9z6kIJdBj31763MivsJXKuZYF6dak5++2mh7NOcsXVHq6sHbhOK/24kOJJMO4AE1vKygwZhxlKSHGKiD+RSu09vOXB43OCrHz96y6T2lsh+OmKXzFdlbLne2UopSAupBhjECcZgjDMgiiSxPhcK/nCr1sfOtcWcm/tq9uEsL4rl0vdK67pKVu2jUwTMk0wBBAzpBCQAnAtiZIlwWQwPlHPglZQAFj1Y23VwVkh92zbd59U+Kanp+p2L12mooKQ5AbcpuclS6LiKoRhxOfHzhXMcs3PtVV7Z0DufXH/LSzpSG9vr1/p6kIz0dDUrvx/IYXAsrJCkWc4e/Z0Zpgf+KX26A/TkNtrXziesY9Xq8tvWNZdVfVYg7hzwKVv3O3ZiKMWj46OTrq5fdOh1x5pSADwjdzo2nbv0u6qqkca2jCIMGcZAuqRhu8vEX7ZK2V2WgMAcXdtvyeKbPS662+osCohzMycHVweniNREoShoZO5KYobpciSh23bFq7rIUgNiLFghRkBlg2v7GlpiccsCHrcryzxUk3zmsNskeYGvt/lxVH4hMWEu9xSWaQFYQ7L1B6iGZ5bBoy+zWKiHiltFHpqeIsVhWaosg1iqlgg4wAAEYEXsV3EmNppJmExMFYUxfVSuIs6E0sI5FkBBhLJzH9laQxLSjBj0WQJgSJPweDTkknvS4JGbCuxKOt7UY4lEQfNnAu9TzLxN2nUdAQTLAEw8YIlAVgAkmDCSBL75eCutSeY+GTUqqNkqUVxUbIl4qgJo4vWzecrhyQAMJldYf1MXLLl1EIsYBZgoGwpRI2zMTPtGBhYbSQAlJF9lieRzNMIriVBzPOWawvoIkYaNC0u9IcAIAHgp75NLQl8ENbPZJ6jgAU48RyFqHEuZyE+Pda/vjENAQBD5s209Y+kPJlyM4+r3lUS0AWSyVEhpHnjYu1pyO+7N4ywwPvhxHDiuwo8j1b5rkQwMZIziYHBXetPzIAAgIV8exZOSMoieI6aU5vKtgR0jqw1JtiYbZfW/R/kSN+mcWbxdtwYjn1XTd9B7cQAfNdCWB/OhBR7jvWv/3tWCAAoO3ktjyZZJ0HHbsq2AooERVQXzPKly2vOgPz29jNNBr+e1IcSz5YAM4hmFzPDtyWS+lDK4N2DfU+dbgsBAFHyd+oszE3agt/GjWcrUBEjj5sQBb96pXpXhAzueDJi4u1p41TsuQpCiFln4bkKeXMoJeadg++tG+sYAgBBXOo3RRrruAnfkWDmGfIdCeQhiiQgQbxjtlqzQk59vCZlNluL5lDiORLyMjcA4DsKeXM4AfDKxa97ThAAqPaMfaR1Nq6jOiqOAhOm5TsKJg1QZGGRedY7V6tzVcjBWk1D0JZ8cigt2RJSimkXnqOgW8MxQLUTb6wN5g0BgGPV0c9BekTH41xx5YXrQ8FkTRgdpxU7ea9djbYQ1GokmJ43wUhWtgRcS04tQjAcw9CWw29tThYOAXD03XVfMps/TTTOy30blDZgiqxFK6p7OsnvCDJ1UD9LyUjORoPDkUQyPfdHbXW+qJCjfRsOwOAoNY4z6Xz01rHq3k5zO4ZMHTabYSIhJD87MLB64f8Ys8WdG/tfBljMJedfwY+s/2P4Pv8AAAAASUVORK5CYII=';
    
    (function (factory, window) {
        // define an AMD module that relies on 'leaflet'
        if (typeof define === "function" && define.amd) {
            define(["leaflet"], factory);
    
            // define a Common JS module that relies on 'leaflet'
        } else if (typeof exports === "object") {
            module.exports = factory(require("leaflet"));
        }
    
        // attach your plugin to the global 'L' variable
        if (typeof window !== "undefined" && window.L) {
            factory(L);
        }
    })(function (L) {
        class LegendSymbol {
            constructor(control, container, legend) {
                this._control = control;
                this._container = container;
                this._legend = legend;
                this._width = this._control.options.symbolWidth;
                this._height = this._control.options.symbolHeight;
            }
        }
    
        class GeometricSymbol extends LegendSymbol {
            constructor(control, container, legend) {
                super(control, container, legend);
    
                this._canvas = this._buildCanvas();
                if (this._drawSymbol) {
                    this._drawSymbol();
                }
                this._style();
            }
    
            _buildCanvas() {
                var canvas = L.DomUtil.create("canvas", null, this._container);
                canvas.height = this._control.options.symbolHeight;
                canvas.width = this._control.options.symbolWidth;
                return canvas;
            }
    
            _drawSymbol() {}
    
            _style() {
                var ctx = (this._ctx = this._canvas.getContext("2d"));
                if (this._legend.fill || this._legend.fillColor) {
                    ctx.globalAlpha = this._legend.fillOpacity || 1;
                    ctx.fillStyle = this._legend.fillColor || this._legend.color;
                    ctx.fill(this._legend.fillRule || "evenodd");
                }
    
                if (this._legend.stroke || this._legend.color) {
                    if (this._legend.dashArray) {
                        ctx.setLineDash(this._legend.dashArray || []);
                    }
                    ctx.globalAlpha = this._legend.opacity || 1.0;
                    ctx.lineWidth = this._legend.weight || 2;
                    ctx.strokeStyle = this._legend.color || "#3388ff";
                    ctx.lineCap = this._legend.lineCap || "round";
                    ctx.lineJoin = this._legend.lineJoin || "round";
                    ctx.stroke();
                }
            }
    
            rescale() {}
    
            center() {}
        }
    
        class CircleSymbol extends GeometricSymbol {
            _drawSymbol() {
                var ctx = (this._ctx = this._canvas.getContext("2d"));
    
                var legend = this._legend;
                var linelWeight = legend.weight || 3;
    
                var centerX = this._control.options.symbolWidth / 2;
                var centerY = this._control.options.symbolHeight / 2;
                var maxRadius = Math.min(centerX, centerY) - linelWeight;
                var radius = maxRadius;
                if (legend.radius) {
                    radius = Math.min(legend.radius, maxRadius);
                }
    
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
            }
        }
    
        class PolylineSymbol extends GeometricSymbol {
            _drawSymbol() {
                var ctx = (this._ctx = this._canvas.getContext("2d"));
    
                var x1 = 0;
                var x2 = this._control.options.symbolWidth;
                var y = this._control.options.symbolHeight / 2;
    
                ctx.beginPath();
                ctx.moveTo(x1, y);
                ctx.lineTo(x2, y);
            }
        }
    
        class RectangleSymbol extends GeometricSymbol {
            _drawSymbol() {
                var ctx = (this._ctx = this._canvas.getContext("2d"));
                var linelWeight = this._legend.weight || 3;
    
                var x0 = this._control.options.symbolWidth / 2;
                var y0 = this._control.options.symbolHeight / 2;
    
                var rx = x0 - linelWeight;
                var ry = y0 - linelWeight;
                if (rx == ry) {
                    ry = ry / 2;
                }
                ctx.rect(x0 - rx, y0 - ry, rx * 2, ry * 2);
            }
        }
    
        /**
         * 圆心坐标：(x0,y0) 半径：r 角度(X轴顺时针旋转)：a
         * 弧度 = 角度 * Math.PI / 180
         * 则圆上任一点为：（x1,y1）
         * x1   =   x0   +   r   *   Math.cos( a  * Math.PI / 180)
         * y1   =   y0   +   r   *   Math.sin( a  * Math.PI / 180)
         */
        class PolygonSymbol extends GeometricSymbol {
            _drawSymbol() {
                var ctx = (this._ctx = this._canvas.getContext("2d"));
    
                var linelWeight = this._legend.weight || 3;
                var x0 = this._control.options.symbolWidth / 2;
                var y0 = this._control.options.symbolHeight / 2;
                var r = Math.min(x0, y0) - linelWeight;
                var a = 360 / this._legend.sides;
                ctx.beginPath();
                for (var i = 0; i <= this._legend.sides; i++) {
                    var x1 = x0 + r * Math.cos(((a * i + (90 - a / 2)) * Math.PI) / 180);
                    var y1 = y0 + r * Math.sin(((a * i + (90 - a / 2)) * Math.PI) / 180);
                    if (i == 0) {
                        ctx.moveTo(x1, y1);
                    } else {
                        ctx.lineTo(x1, y1);
                    }
                }
            }
        }
    
        class ImageSymbol extends LegendSymbol {
            constructor(control, container, legend) {
                super(control, container, legend);
                this._img = null;
                this._loadImages();
            }
    
            _loadImages() {
                var imageLoaded = () => {
                    this.rescale();
                };
                var img = L.DomUtil.create("img", null, this._container);
                this._img = img;
                img.onload = imageLoaded;
                img.src = this._legend.url;
            }
    
            rescale() {
                if (this._img) {
                    var _options = this._control.options;
                    if (this._img.width > _options.symbolWidth || this._img.height > _options.symbolHeight) {
                        var imgW = this._img.width;
                        var imgH = this._img.height;
                        var scaleW = _options.symbolWidth / imgW;
                        var scaleH = _options.symbolHeight / imgH;
                        var scale = Math.min(scaleW, scaleH);
                        this._img.width = imgW * scale;
                        this._img.height = imgH * scale;
                    }
                    this.center();
                }
            }
    
            center() {
                var containerCenterX = this._container.offsetWidth / 2;
                var containerCenterY = this._container.offsetHeight / 2;
                var imageCenterX = parseInt(this._img.width) / 2;
                var imageCenterY = parseInt(this._img.height) / 2;
    
                var shiftX = containerCenterX - imageCenterX;
                var shiftY = containerCenterY - imageCenterY;
    
                this._img.style.left = shiftX.toString() + "px";
                this._img.style.top = shiftY.toString() + "px";
            }
        }
    
        L.Control.Legend = L.Control.extend({
            options: {
                position: "topleft",
                title: "Legend",
                legends: [],
                symbolWidth: 24,
                symbolHeight: 24,
                opacity: 1.0,
                column: 1,
                collapsed: false,
            },
    
            initialize: function (options) {
                L.Util.setOptions(this, options);
                this._legendSymbols = [];
                this._buildContainer();
            },
    
            onAdd: function (map) {
                this._map = map;
                this._initLayout();
                return this._container;
            },
    
            _buildContainer: function () {
                this._container = L.DomUtil.create("div", "leaflet-legend leaflet-bar leaflet-control");
                this._container.style.backgroundColor = "rgba(255,255,255, " + this.options.opacity + ")";
    
                this._contents = L.DomUtil.create("section", "leaflet-legend-contents", this._container);
                this._link = L.DomUtil.create("a", "leaflet-legend-toggle", this._container);
                this._link.title = "Legend";
                this._link.href = "#";
    
                var title = L.DomUtil.create("h3", "leaflet-legend-title", this._contents);
                title.innerText = this.options.title || "Legend";
    
                var len = this.options.legends.length;
                var colSize = Math.ceil(len / this.options.column);
                var legendContainer = this._contents;
                for (var i = 0; i < len; i++) {
                    if (i % colSize == 0) {
                        legendContainer = L.DomUtil.create("div", "leaflet-legend-column", this._contents);
                    }
                    var legend = this.options.legends[i];
                    this._buildLegendItems(legendContainer, legend);
                }
            },
    
            _buildLegendItems: function (legendContainer, legend) {
                var legendItemDiv = L.DomUtil.create("div", "leaflet-legend-item", legendContainer);
                if (legend.inactive) {
                    L.DomUtil.addClass(legendItemDiv, "leaflet-legend-item-inactive");
                }
                var symbolContainer = L.DomUtil.create("i", null, legendItemDiv);
    
                var legendSymbol;
                if (legend.type === "image") {
                    legendSymbol = new ImageSymbol(this, symbolContainer, legend);
                } else if (legend.type === "circle") {
                    legendSymbol = new CircleSymbol(this, symbolContainer, legend);
                } else if (legend.type === "rectangle") {
                    legendSymbol = new RectangleSymbol(this, symbolContainer, legend);
                } else if (legend.type === "polygon") {
                    legendSymbol = new PolygonSymbol(this, symbolContainer, legend);
                } else if (legend.type === "polyline") {
                    legendSymbol = new PolylineSymbol(this, symbolContainer, legend);
                } else {
                    L.DomUtil.remove(legendItemDiv);
                    return;
                }
                this._legendSymbols.push(legendSymbol);
    
                symbolContainer.style.width = this.options.symbolWidth + "px";
                symbolContainer.style.height = this.options.symbolHeight + "px";
    
                var legendLabel = L.DomUtil.create("span", null, legendItemDiv);
                legendLabel.innerText = legend.label;
                if (legend.layers) {
                    L.DomUtil.addClass(legendItemDiv, "leaflet-legend-item-clickable");
                    L.DomEvent.on(
                        legendItemDiv,
                        "click",
                        function () {
                            this._toggleLegend.call(this, legendItemDiv, legend.layers);
                        },
                        this
                    );
                }
            },
    
            _initLayout: function () {
                L.DomEvent.disableClickPropagation(this._container);
                L.DomEvent.disableScrollPropagation(this._container);
    
                if (this.options.collapsed) {
                    this._map.on("click", this.collapse, this);
    
                    L.DomEvent.on(
                        this._container,
                        {
                            mouseenter: this.expand,
                            mouseleave: this.collapse,
                        },
                        this
                    );
                } else {
                    this.expand();
                }
            },
    
            _toggleLegend: function (legendDiv, layers) {
                if (L.DomUtil.hasClass(legendDiv, "leaflet-legend-item-inactive")) {
                    L.DomUtil.removeClass(legendDiv, "leaflet-legend-item-inactive");
                    if (L.Util.isArray(layers)) {
                        for (var i = 0, len = layers.length; i < len; i++) {
                            this._map.addLayer(layers[i]);
                        }
                    } else {
                        this._map.addLayer(layers);
                    }
                } else {
                    L.DomUtil.addClass(legendDiv, "leaflet-legend-item-inactive");
                    if (L.Util.isArray(layers)) {
                        for (var i = 0, len = layers.length; i < len; i++) {
                            this._map.removeLayer(layers[i]);
                        }
                    } else {
                        this._map.removeLayer(layers);
                    }
                }
            },
    
            expand: function () {
                this._link.style.display = "none";
                L.DomUtil.addClass(this._container, "leaflet-legend-expanded");
                for (var legendSymbol of this._legendSymbols) {
                    legendSymbol.rescale();
                }
                return this;
            },
    
            collapse: function () {
                this._link.style.display = "block";
                L.DomUtil.removeClass(this._container, "leaflet-legend-expanded");
                return this;
            },
    
            redraw: function () {
                L.DomUtil.empty(this._contents);
                this._buildLegendItems();
            },
        });
    
        L.control.legend = L.control.Legend = function (options) {
            return new L.Control.Legend(options);
        };
    }, window);