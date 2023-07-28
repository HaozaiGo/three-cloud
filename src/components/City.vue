<template>
    <div class="container" ref="sessionCity">

    </div>
</template>
<script>
import { reactive, toRefs, onBeforeMount, onMounted, ref } from 'vue'

import * as THREE from 'three';
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
const OrbitControls = require('three-orbit-controls')(THREE);

// import model from '../../static/city.mtl';

export default {
    name: 'App',
    components: {},
    setup() {
        const sessionCity = ref(null);

        const data = reactive({})


        let camera = {},
            scene = {},
            renderer = {},
            MyObj = {},
            controls = {}
        // cube = {};

        const initScrene = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 60, 100);


            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            sessionCity.value.appendChild(renderer.domElement);

            // const light = new THREE.AmbientLight(0x404040); // 柔和的白光
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0, 300, 200);
            scene.add(directionalLight);

            //初始化控制器
            controls = new OrbitControls(camera);
            controls.target.set(0, 0, 0);
            controls.minDistance = 80;
            controls.maxDistance = 400;
            controls.maxPolarAngle = Math.PI / 3;
            controls.update();



            let Loader = new OBJLoader();
            let MelLoader = new MTLLoader();
            MelLoader.load('./city.mtl', function (mtl) {
                console.log(mtl);
                mtl.preload();

                Loader.setMaterials(mtl);
                Loader.load('./city.obj', function (obj) {
                    MyObj = obj
                    console.log(MyObj);

                    MyObj.position.set(0, 10, 0)
                    scene.add(MyObj);
                })
            })



            // const loader = new THREE.ObjectLoader();
            // console.log(loader);
            // loader.load(
            //     // 资源的URL
            //     '../../public/city.obj',

            //     // onLoad回调
            //     // Here the loaded data is assumed to be an object
            //     function (obj) {
            //         // Add the loaded object to the scene
            //         console.log(obj);
            //         scene.add(obj);
            //     },

            //     // onProgress回调
            //     function (xhr) {
            //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            //     },

            //     // onError回调
            //     function (err) {
            //         console.error(err, 'An error happened');
            //     }
            // );




            // const geometry = new THREE.BoxGeometry(1, 1, 1);
            // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            // cube = new THREE.Mesh(geometry, material);
            // scene.add(cube);



        }


        const render = () => {
            requestAnimationFrame(render);

            try {
                MyObj.rotation.y += 0.005;
            } catch (err) {
                console.log(err);
            }


            renderer.render(scene, camera);
        }

        onBeforeMount(() => {

        })
        onMounted(() => {

            initScrene();
            render();
        })
        return {
            ...toRefs(data),
            sessionCity,
        }
    },
}

</script>
<style  scoped>
.container {
    width: 100%;
    height: 100vh;
    background-color: #000;
}
</style>
