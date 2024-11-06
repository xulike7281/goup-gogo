<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;
let mouseTool = null;
const isDrawing = ref(false);
// const polyEditor = ref(null)
let polyEditor = null;
onMounted(() => {
    AMapLoader.load({
        key: "17ab27a92729f0fea7b262ee3b5d1106", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.MouseTool', 'AMap.PolygonEditor'], // 加载MouseTool插件
    })
        .then((AMap) => {
            map = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "3D", // 是否为3D地图模式
                zoom: 11, // 初始化地图级别
                // center: [116.397, 39.918],
                center: [116.471354, 39.994257],
            });

            // 初始化MouseTool
            // mouseTool = new AMap.MouseTool(map);

            // var path1 = [[116.475334, 39.997534], [116.476627, 39.998315], [116.478603, 39.99879], [116.478529, 40.000296], [116.475082, 40.000151], [116.473421, 39.998717]]
            // var path2 = [[116.474595, 40.001321], [116.473526, 39.999865], [116.476284, 40.000917]]
            // var polygon1 = new AMap.Polygon({
            //     path: path1
            // })
            // var polygon2 = new AMap.Polygon({
            //     path: path2
            // })

            // map.add([polygon1, polygon2]);
            map.setFitView();
            polyEditor = new AMap.PolygonEditor(map);
            polyEditor.addAdsorbPolygons([polygon1, polygon2]);
            polyEditor.on('add', function (data) {
                console.log(data);
                var polygon = data.target;
                polyEditor.addAdsorbPolygons(polygon);
                polygon.on('dblclick', () => {
                    polyEditor.setTarget(polygon);
                    polyEditor.open();
                })
            })
            polygon1.on('dblclick', () => {
                polyEditor.setTarget(polygon1);
                polyEditor.open();
            })
            polygon2.on('dblclick', () => {
                polyEditor.setTarget(polygon2);
                polyEditor.open();
            })
            polyEditor.setTarget(polygon2);

        })

        .catch((e) => {
            console.log(e);
        });
});

onUnmounted(() => {
    map?.destroy();
});

const createPolygon = () => {
    console.log('polyEditor.value: ', polyEditor.value);
    polyEditor.close();
    polyEditor.setTarget();
    polyEditor.open();
}
const open = () => {
    polyEditor.open();
}
const close = () => {
    polyEditor.close();
    // 获取当前多边形的路径并打印
    const targetPolygon = polyEditor.getTarget();
    if (targetPolygon) {
        const path = targetPolygon.getPath();
        console.log('多边形路径点: ', path);
    }
}
</script>

<template>
    <div id="container"></div>
    <div class="input-card" style="width: 120px">
        <button class="btn" @click="createPolygon" style="margin-bottom: 5px">新建</button>
        <button class="btn" @click="open" style="margin-bottom: 5px">开始编辑</button>
        <button class="btn" @click="close">结束编辑</button>
    </div>
</template>

<style scoped>
#container {
    width: 100%;
    height: 400px;
}

button {
    margin: 10px;
}
</style>