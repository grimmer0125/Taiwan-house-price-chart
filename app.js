const config = {
  apiKey: "AIzaSyCoDf4HF9cT88KfjsFIk8-6whrxsSdd7mQ",
  authDomain: "taiwanhouseprice.firebaseapp.com",
  databaseURL: "https://taiwanhouseprice.firebaseio.com",
  projectId: "taiwanhouseprice",
  storageBucket: "taiwanhouseprice.appspot.com",
  messagingSenderId: "824802621737"
};
console.log("fire:", firebase);
firebase.initializeApp(config);
// var db = firebase.database();//.ref('houseprice')

Vue.component('sub-component', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  // props: ['todo'],
  // template: '<li>{{ todo.text }}</li>'
  //      template: '<div>{{ "hello"}}</div>'
  template: '#sub-template'
})
var app = new Vue({
  el: '#app',
  data: {
    //selected: "B",//"不動產", A , 預售屋 B

    selectedHouseType: 'A',
    houseTypeOptions: [
      {
        text: '不動產',
        value: 'A'
      }, {
        text: "預售屋",
        value: 'B'
      }, {
        text: "不動產+預售屋(平均)",
        value: 'C'
      }
    ],

    // message: 'You loaded this page on ' + new Date().toLocaleString(),
    selectedCity: 'A',
    cityList: [
      {
        code: "C",
        name: "基隆市"
      }, {
        code: "A",
        name: "臺北市"
      }, {
        code: "F",
        name: "新北市"
      }, {
        code: "H",
        name: "桃園市"
      }, {
        code: "O",
        name: "新竹市"
      }, {
        code: "J",
        name: "新竹縣"
      }, {
        code: "K",
        name: "苗栗縣"
      }, {
        code: "B",
        name: "臺中市"
      }, {
        code: "M",
        name: "南投縣"
      }, {
        code: "N",
        name: "彰化縣"
      }, {
        code: "P",
        name: "雲林縣"
      }, {
        code: "I",
        name: "嘉義市"
      }, {
        code: "Q",
        name: "嘉義縣"
      }, {
        code: "D",
        name: "臺南市"
      }, {
        code: "E",
        name: "高雄市"
      }, {
        code: "T",
        name: "屏東縣"
      }, { //,它的A, ios讀不到!!
        code: "G",
        name: "宜蘭縣"
      }, {
        code: "U",
        name: "花蓮縣"
      }, {
        code: "V",
        name: "臺東縣"
      }, {
        code: "X",
        name: "澎湖縣"
      }, {
        code: "W",
        name: "金門縣"
      }, {
        code: "Z",
        name: "連江縣"
      }
    ],

    mode: "Single"
    // selected: ''
    // data1: {
    //   x: [
    //     1, 2, 3, 4, 5
    //   ],
    //   y: [1, 2, 4, 8, 16]
    // },
    // data2: {
    //   x: [
    //     5, 4, 3, 2, 1
    //   ],
    //   y: [1, 2, 4, 8, 16]
    // }
  },

  // ref: https://github.com/vuejs/vue/blob/dev/examples/firebase/app.js#L11:15
  // https://github.com/vuejs/vuefire

  // firebase: {
  //    hide the get action of firebase, e.g.
  //    firebase.database().ref("houseprice").on
  //    houseData: houseRef,
  //   houseData: {
  //     source: db.ref("/houseprice"),
  //      optionally bind as an object
  //     asObject: true,
  //      optionally provide the cancelCallback
  //     cancelCallback: function () {},
  //      this is called once the data has been retrieved from firebase
  //     readyCallback: function () {}
  //   }
  // },

  //called before "beforeUpdate"
  watch: {
    selectedHouseType: function(val, oldVal) {
      console.log('new selected: %s, old: %s', val, oldVal)
      if (val !== oldVal) {
        //redraw Plotly
        // if (this.selected == "B") {
        //   console.log("try to draw data2");
        //
        //    relayout: use the original data, just change layout
        //    Plotly.relayout(this.$refs.pie, [this.data2]);
        //    Plotly.update(this.$refs.pie, [this.data2]);
        //   console.log("data2:", this.data2);
        //
        //   FIXIT:
        //    somehow .update does not effect https://plot.ly/javascript/plotlyjs-function-reference/#plotlyupdate
        //    so use newPlot
        //   Plotly.newPlot(this.$refs.pie, [this.data2]);
        // }

        this.redrawPlotly();
      }
    },

    selectedCity: function(val, oldVal) {
      console.log('new selected: %s, old: %s', val, oldVal)
      if (val !== oldVal) {
        this.redrawPlotly();
      }
    },

    mode: function(val, oldVal) {
      if (val !== oldVal && val === "Single") {
        console.log("change to single, redraw");
        this.redrawPlotly();
      }
    }
  },

  // or use watch
  beforeUpdate: function() {
    console.log("before update");
  },

  methods: {
    redrawPlotly: function() {
      const x_list = [];
      const y_list = [];
      let cityName = '';

      const dates = Object.keys(this.houseData); //this.$firebaseRefs.houseData);//this.houseData);
      for (const date of dates) {

        // S1 -> 0.125
        // S2 -> 0.375
        // S3 -> 0.625,
        // S4 -> 0.875

        // change 2017S3 -> 2017.

        // array
        const dateData = this.houseData[date];

        if (dateData.hasOwnProperty(this.selectedCity)) {
          const city = dateData[this.selectedCity];

          // }
          // for (let city of quarterData) {
          //   console.log("city:%s;target:%s", city.code, this.selectedCity)
          //   if (city.code == this.selectedCity) {

          cityName = city.name;

          x_list.push(date);
          //bingo
          // if (quarter.indexOf("S1") > -1) {
          //   x_list.push(quarter.replace("S1", "-02-15"));
          // } else if (quarter.indexOf("S2") > -1) {
          //   x_list.push(quarter.replace("S2", "-05-15"));
          // } else if (quarter.indexOf("S3") > -1) {
          //   x_list.push(quarter.replace("S3", "-08-15"));
          // } else if (quarter.indexOf("S4") > -1) {
          //   x_list.push(quarter.replace("S4", "-11-15"));
          // }

          if (this.selectedHouseType == "A") {
            y_list.push(city.priceA / 10000)
          } else if (this.selectedHouseType == "B") {
            y_list.push(city.priceB / 10000)
          } else if (this.selectedHouseType == "C") {
            y_list.push(city.price / 10000)
          }
          //
          // break;
          // }
        }

      }
      // Plotly.plot(this.$refs.pie, [this.data1], {
      //   margin: {
      //     t: 0
      //   }
      // });

      // data1: {
      //   x: [1, 2, 3, 4, 5],
      //   y: [1, 2, 4, 8, 16]
      // },

      //   text: '不動產',
      //   value: 'A'
      // },
      // {
      //   text: "預售屋",
      //   value: 'B'
      // },
      // {
      //   text: "不動產+預售屋(平均)",
      if (this.selectedHouseType == "A") {
        cityName = cityName + "-" + "不動產";
      } else if (this.selectedHouseType == "B") {
        cityName = cityName + "-" + "預售屋";
      } else if (this.selectedHouseType == "C") {
        cityName = cityName + "-" + "不動產+預售屋(平均)";
      }

      const final = {
        x: x_list,
        y: y_list,
        name: cityName
      };
      console.log("final x,y list:", final);

      const layout = {
        //     "layout": {
        "title": "台灣預售屋及不動產房價資料(2012S4～2014S3為季度平均,之後為一次10or15天平均), 顯示單位:萬",
        // "xaxis": {
        //     "tickformat": "%b %y",
        //     "tickprefix": "~~ ",
        //     "showtickprefix": "first",
        //     "ticksuffix": " !!",
        //     "showticksuffix": "last"
        // },
        // "yaxis": {
        //      "type": "log",
        //     "tickformat": "x<2.3s"
        //     ":04,2f"  https://stackoverflow.com/questions/36546714/plotly-axis-label-format-with-plotly-js
        // }
        // }
      }

      //      Plotly.plot(this.$refs.pie, [final], layout);

      if (this.mode === "Single") {
        Plotly.newPlot(this.$refs.pie, [final], layout);
      } else {
        Plotly.plot(this.$refs.pie, [final], layout);

      }

    }
  },
  // https://vuejs.org/v2/guide/components.html
  mounted: function() {

    console.log("mounted");
    const dataPath = "/houseprice";
    firebase.database().ref(dataPath).on('value', (snap) => {
      console.log("get the house data:");
      console.log("get the house data2:", snap.val());
      this.houseData = snap.val();

      this.redrawPlotly();
    });
    //   houseData: {
    //     source: db.ref("/houseprice"),
    // fetch("house_price.json").then(response => response.json()).then(json => {
    //
    //    this.houseData = json;
    //
    //   console.log("house price:")
    //   console.log(this.houseData)
    //
    //   console.log("mounted sub:", this.$refs.pie);
    //
    //   this.redrawPlotly();
    // });

    // this.$nextTick(function() {
    // Code that will run only after the
    // entire view has been rendered
    // })
  }
})
