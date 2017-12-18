const NewTaipeiDistricts = {
  全區: 1,
  萬里區: 207,
  金山區: 208,
  板橋區: 220,
  汐止區: 221,
  深坑區: 222,
  石碇區: 223,
  瑞芳區: 224,
  平溪區: 226,
  雙溪區: 227,
  貢寮區: 228,
  新店區: 231,
  坪林區: 232,
  烏來區: 233,
  永和區: 234,
  中和區: 235,
  土城區: 236,
  三峽區: 237,
  樹林區: 238,
  鶯歌區: 239,
  三重區: 241,
  新莊區: 242,
  泰山區: 243,
  林口區: 244,
  蘆洲區: 247,
  五股區: 248,
  八里區: 249,
  淡水區: 251,
  三芝區: 252,
  石門區: 253,
};

const TaipeiDistricts = {
  全區: '1',
  中正區: '100',
  大同區: '103',
  中山區: '104',
  松山區: '105',
  大安區: '106',
  萬華區: '108',
  信義區: '110',
  士林區: '111',
  北投區: '112',
  內湖區: '114',
  南港區: '115',
  文山區: '116',
};
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
    selectedCity: 'F',
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

    selectedDistrict:'全區',
    mode: "Single",
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

  computed: {
    // a computed getter
    districtList: function () {
      // `this` points to the vm instance
      // return this.message.split('').reverse().join('')

      if(this.selectedCity == "A") {
        return Object.keys(TaipeiDistricts);
      } else if(this.selectedCity == "F") {
        return Object.keys(NewTaipeiDistricts);
      } else {
        return [];
      }
    }
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
    },

    selectedDistrict: function(val, oldVal) {

      // 如果從新北-新店 -> 新竹市/台北市, 此值不會變, 但台北市選單ui會show第一個
      console.log("new selectedDistrict:", val);

      if (val !== oldVal) {
        this.redrawPlotly();
      }
      // if (val !== oldVal && val === "Single") {
      //   console.log("change to single, redraw");
      //   this.redrawPlotly();
      // }
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

          let region = null;
          if (city.districts && this.selectedDistrict && city.districts.hasOwnProperty(this.selectedDistrict)) {
            region = city.districts[this.selectedDistrict];
          } else {
            region = city;
          }

          if (this.selectedHouseType == "A") {
            // let region = null;
            // if (city.districts && this.selectedDistrict && city.districts.hasOwnProperty(selectedDistrict)) {
            //   region = city.districts[selectedDistrict];
            // } else {
            //   region = city
            // }
            y_list.push(region.dataA.price / 10000);
          } else if (this.selectedHouseType == "B") {
            // let region = null;
            // if (city.districts && this.selectedDistrict && city.districts.hasOwnProperty(selectedDistrict)) {
            //   region = city.districts[selectedDistrict];
            // } else {
            //   y_list.push(city.dataA.price / 10000)
            // }
            y_list.push(region.dataB.price / 10000);
          } else if (this.selectedHouseType == "C") {

            // if (city.districts && this.selectedDistrict && city.districts.hasOwnProperty(selectedDistrict)) {
            //   y_list.push(city.districts[selectedDistrict].price / 10000);
            // } else {
            //   y_list.push(city.price / 10000)
            // }
            y_list.push(region.price / 10000);
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

      if (this.selectedDistrict && this.selectedDistrict != "全區") {
        cityName += this.selectedDistrict;
      }
      const final = {
        x: x_list,
        y: y_list,
        name: cityName
      };
      console.log("final x,y list:", final);

      const layout = {
        //     "layout": {
        "title": "台灣預售屋及不動產房價資料(2012S4～2017S3為季度平均,之後為一次10or15天平均), 顯示單位:萬",
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
      console.log("get the house data:", snap.val());
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
