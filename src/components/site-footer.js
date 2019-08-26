import React, { Component } from 'react';
import { Link } from 'gatsby'

import logo from './circle-logo.png';
import styles from './site-footer.module.css'

const Footer = (props) => {

    return (
        <footer className={styles.footer}>
            <h3 className={styles.title}>Be good people, make good things.</h3>

            <div className={styles.flex}>
                <div className={styles.content}>
                    <div className={styles.links}>
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                        <a href="#">Facebook</a>
                        <a href="#">Email</a>
                        <a href="#">123-456-7890</a>
                        <Link to="/jobs">Jobs</Link>
                    </div>
                </div>               
                <div className={styles.logo}>
                    <svg width="103" height="106" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fillRule="evenodd"><path d="M57.814 98.398c-.033-.243-.04-.572-.124-.881a3.735 3.735 0 0 0-1.206-1.908c-.687-.589-1.455-.883-2.345-.876-1.039.007-1.89.515-2.72 1.062-.094.062-.163.17-.23.266-.587.846-.987 1.783-1.13 2.795-.052.363-.237.848.21 1.169.043.03.02.141.04.211.201.708.538 1.366 1.085 1.836.604.519 1.283.975 2.148.964.424-.006.863.277 1.271-.075.046-.04.145-.01.215-.028.198-.052.399-.098.587-.173.597-.237.99-.67 1.337-1.218.602-.948.82-1.971.862-3.144m2.961-.34c-.01.974-.012 1.948-.28 2.895a5.743 5.743 0 0 1-1.107 2.089c-.53.65-1.168 1.162-1.833 1.652-.13.096-.273.18-.421.243-.81.35-1.617.7-2.476.93a3.867 3.867 0 0 1-1.522.1c-.392-.05-.796-.003-1.164-.191-.983-.503-1.997-.961-2.73-1.837-.009-.011-.023-.02-.03-.032-.723-1.26-1.608-2.447-1.886-3.917-.157-.823-.352-1.654-.097-2.492.136-.449.277-.902.477-1.324.305-.642.708-1.229 1.273-1.675.353-.279.74-.514 1.108-.775.252-.178.552-.324.734-.558.363-.467.88-.626 1.39-.757.558-.144 1.13-.274 1.728-.215.451.043.91.003 1.366.013.16.004.33.02.475.077.763.305 1.553.576 2.216 1.066 1.049.773 2 1.653 2.523 2.891.155.366.272.746.257 1.153-.007.222 0 .443 0 .665M11.215 30.172c.162.178.33.35.482.535.306.375.603.758.904 1.138.195.246.375.505.587.735.792.862 1.594 1.714 2.391 2.572.288.309.278.306.042.69-.12.196-.29.36-.215.656.057.225-.425.54-.674.498-.433-.073-.888-.08-1.298-.22-.645-.22-1.32-.206-1.972-.354-.513-.116-1.04-.165-1.56-.253a880.379 880.379 0 0 1-3.789-.653c-.643-.112-1.284-.242-1.93-.342-.265-.04-.54-.023-.81-.033-.324-.012-.65-.003-.97-.043-.326-.041-.532-.213-.311-.626.333-.624.588-1.29.864-1.944.14-.332.166-.36.545-.296.858.145 1.715.29 2.571.439 1.052.183 2.107.342 3.176.374.18.005.359-.013.606-.024-.09-.159-.132-.26-.196-.344-.494-.645-.994-1.286-1.488-1.931-.087-.113-.153-.24-.234-.358l-1.661-2.392a1.076 1.076 0 0 0-.107-.134c-.355-.368-.36-.434-.085-.873.061-.096.12-.194.17-.297.17-.359.312-.453.698-.4.353.047.701.13 1.054.177 1.242.165 2.486.32 3.729.482.292.039.583.09.957.148-.372-.393-.703-.721-1.01-1.07-.431-.492-.859-.989-1.264-1.503-.494-.627-.954-1.283-1.447-1.912-.276-.353-.359-.684-.107-1.095.169-.276.265-.597.397-.896a1.21 1.21 0 0 1 .103-.186c.37-.554.546-.572 1.03-.105.758.736 1.521 1.466 2.27 2.211.83.825 1.64 1.67 2.47 2.495.495.492 1.024.95 1.519 1.444.655.655 1.293 1.33 1.935 1.999.108.112.204.238.294.366.13.184.166.357.043.589-.131.245-.183.535-.258.808-.088.316-.223.41-.543.382-.821-.07-1.644-.131-2.465-.2-.411-.035-.821-.09-1.233-.117-.806-.054-1.612-.093-2.418-.145-.252-.016-.503-.052-.755-.08-.012.03-.024.06-.037.088M102.632 46.04c.02.466.05.887.052 1.307.002.433-.063.87-.022 1.298.026.278-.09.357-.293.387-.433.065-.859.144-1.31.071-.417-.067-.85-.033-1.276-.034-.915-.002-1.83 0-2.745.003-.173 0-.346.02-.58.034.08.125.115.222.182.278.588.488 1.082 1.081 1.741 1.494.42.261.765.64 1.162.94.274.207.58.369.935.589.003.026.063.158.027.254-.12.329-.129.659-.102 1.001a.355.355 0 0 1-.132.266c-.771.543-1.394 1.253-2.104 1.865-.334.288-.675.569-1.018.848-.067.055-.156.083-.234.124l.067.123c.12.026.24.077.358.074 1.363-.04 2.726-.093 4.089-.133.366-.011.734-.006 1.1.015.342.02.435.168.415.53-.03.555-.049 1.112-.056 1.668-.002.12.07.239.112.374a.915.915 0 0 1-.668.253c-1.04-.003-2.08-.015-3.119 0-.673.01-1.347.053-2.02.098-.628.042-1.26.077-1.881.169-1.118.166-2.22-.064-3.33-.076a4.815 4.815 0 0 0-.917.099c-.43.08-.82.078-1.065-.324.01-.21.024-.413.026-.614.002-.176-.025-.354-.012-.528.02-.278.14-.447.414-.606.646-.375 1.256-.82 1.85-1.277.78-.601 1.53-1.243 2.296-1.864.457-.371.918-.738 1.379-1.104.08-.063.168-.113.306-.205-1.034-.82-1.99-1.574-2.94-2.335-.78-.626-1.541-1.277-2.335-1.886-.43-.33-.666-.668-.545-1.257.086-.422.016-.878.016-1.371.13-.03.26-.078.394-.087.994-.068 1.995-.036 2.98-.242.269-.055.556-.018.835-.03.483-.022.972-.111 1.448-.06.745.078 1.46-.06 2.185-.156.273-.036.556.013.834.014 1.028.007 2.055.01 3.083.014h.418M84.156 80.467c-.025.814.178 1.47.4 2.129.14.418.398.768.724 1.01 1.071.798 2.239 1.316 3.642 1.175.768-.078 1.358-.467 1.947-.872.278-.192.517-.464.715-.741.415-.581.469-1.29.624-1.96.023-.098-.008-.21-.017-.313-.095-1.054-.672-1.885-1.286-2.687-.726-.949-1.778-1.314-2.913-1.45-.742-.09-1.419.189-2.067.524-.53.677-1.35 1.12-1.552 2.072-.086.407-.244.796-.217 1.113m4.054-6.462c.824.038 1.653.021 2.447.338.592.236 1.05.642 1.52 1.04.724.618 1.363 1.312 1.877 2.117.08.126.202.225.286.348.083.122.163.254.209.393.078.24.126.492.193.738.259.933.302 1.874.221 2.842-.075.9-.273 1.76-.688 2.546-.472.893-1.123 1.654-2.026 2.171-.456.262-.882.577-1.34.835a4.27 4.27 0 0 1-.868.354 6.049 6.049 0 0 1-3.125.124 25.507 25.507 0 0 1-2.434-.66c-.372-.125-.722-.377-1.024-.638-.915-.79-1.608-1.742-1.991-2.9a1.174 1.174 0 0 0-.073-.165c-.39-.764-.447-1.577-.357-2.411.003-.03.012-.06.009-.09-.098-.96.283-1.812.564-2.698a6.483 6.483 0 0 1 .732-1.523c.402-.633.848-1.248 1.49-1.663.545-.352 1.16-.574 1.79-.727.85-.207 1.701-.409 2.588-.371M10.193 50.394H8.415c-.02.12-.055.232-.058.345-.007.278-.02.558.006.834.04.442.088.888.377 1.251.309.388.986.43 1.235.048.147-.225.29-.504.3-.764.02-.554-.047-1.112-.082-1.714M5.66 50.23c-.402-.111-2.62-.188-2.909-.1.058.605-.07 1.218.11 1.833.097.335.133.688.298 1.005.342.654 1.16.913 1.751.496.328-.23.563-.583.655-1.001.162-.741.106-1.492.095-2.233m1.468 4.836c-.2.239-.402.462-.586.7-.23.297-.518.504-.846.66-.169.079-.344.146-.507.237-1.424.792-3.423.093-4.296-1.067A4.383 4.383 0 0 1 0 52.87c.006-.442.094-.882.142-1.323.013-.117.035-.236.024-.351-.108-1.149.033-2.295.04-3.442.004-.708.13-.787.796-.747.84.05 1.678.112 2.517.154.677.035 1.363.126 2.031.056 1.03-.11 2.049-.013 3.07.053a28.71 28.71 0 0 0 3.759-.002c.085-.006.17-.007.257-.005.317.008.393.106.355.434-.047.396-.108.791-.127 1.189-.037.72-.062 1.443-.065 2.164-.005.948-.058 1.889-.263 2.816-.09.41-.234.779-.536 1.082-.59.592-1.201 1.143-2.037 1.315-.497.103-.986.077-1.464-.138-.257-.115-.565-.11-.771-.348-.19-.22-.374-.444-.6-.713M94 21.27c-.233.239-.481.505-.743.756-.35.335-.712.658-1.068.987-.537.496-1.064 1.005-1.613 1.488-.66.582-1.338 1.145-2.013 1.71-.213.18-.455.325-.659.513-.507.468-.998.952-1.498 1.426-.394.374-.79.744-1.186 1.113-.257.24-.517.476-.801.737-.795-.586-1.342-1.387-1.976-2.154.74-1.069 1.718-1.906 2.661-2.838-.106-.15-.193-.298-.305-.425-.607-.696-1.22-1.387-1.832-2.078a29.372 29.372 0 0 0-.647-.703c-.247-.261-.329-.268-.632-.039-.41.31-.814.627-1.22.939-.059.045-.116.094-.182.125-.45.21-.824.505-1.04.93-.448.08-.734-.15-.934-.432-.268-.38-.63-.606-1.015-.824-.373-.213-.388-.36-.081-.665.041-.041.107-.073.123-.122.227-.673.836-.95 1.351-1.322.048-.034.122-.05.145-.095.312-.613.916-.947 1.359-1.436.452-.5.957-.951 1.442-1.422.484-.47.978-.933 1.457-1.41.572-.57 1.114-1.172 1.702-1.725.49-.46 1.026-.869 1.545-1.304.509.35.922.715 1.306 1.118.15.157.325.293.503.417.327.227.358.408.076.668-.762.703-1.533 1.397-2.291 2.105-.612.572-1.21 1.157-1.809 1.743-.124.12-.22.27-.356.438.267.288.587.608.877.953.312.37.598.763.892 1.149.212.28.403.577.634.84.22.252.479.47.722.702.152.144.297.084.434-.025.39-.311.793-.608 1.164-.94.985-.882 1.953-1.783 2.936-2.666.195-.175.422-.318.649-.45.237-.138.306-.104.473.119.29.387.595.763.873 1.159.2.284.365.591.577.94M25.732 18.026c-.766.145-1.243.665-1.75 1.158-.347.338-.752.609-1.126.917-.338.28-.668.568-1.016.864.682 1.214 1.56 2.2 2.378 3.241-.334.484-.737.803-1.14 1.121-.223.178-.456.343-.672.529-.217.186-.338.2-.545-.002-.165-.16-.312-.34-.479-.497a22.777 22.777 0 0 1-2.466-2.767 592.504 592.504 0 0 1-2.1-2.757c-.218-.288-.415-.593-.629-.885-.17-.233-.351-.457-.526-.687-.157-.208-.311-.418-.467-.626-.182-.244-.367-.485-.545-.732-.202-.278-.407-.555-.595-.843-.104-.16-.048-.316.088-.43.525-.44 1.05-.882 1.582-1.313.18-.145.397-.08.545.112.385.501.776.998 1.168 1.494.184.232.365.466.562.685.55.61 1.11 1.21 1.658 1.821.209.233.395.489.618.768.318-.313.613-.6.906-.89.367-.364.738-.723 1.097-1.095.422-.437.933-.748 1.4-1.119.132-.104.245-.235.408-.395-.231-.289-.436-.564-.66-.822-.73-.84-1.476-1.664-2.194-2.514-.363-.429-.684-.897-1.012-1.357-.165-.231-.154-.352.03-.546.436-.458.876-.911 1.319-1.362.137-.139.311-.132.48.041.267.273.56.535.76.857.315.505.74.894 1.127 1.322.56.62 1.174 1.19 1.727 1.817.601.68 1.172 1.392 1.732 2.111.37.478.687 1.003 1.048 1.49.32.431.671.835.998 1.26.177.23.337.472.493.718.121.192.068.36-.097.504-.482.423-.96.851-1.44 1.277-.23.203-.333.22-.536-.019-.606-.715-1.332-1.314-1.843-2.122-.076-.12-.187-.216-.286-.327M97.394 25.452c-.264.474.061.835.247 1.177.367.675.56 1.414.846 2.117.11.27.24.53.364.794.025.052.07.096.089.15.226.633.449 1.267.673 1.9.05.14.081.29.154.413.208.357.295.73.185 1.16l-1.724.97c-.179.1-.278.034-.364-.151-.373-.794-.705-1.615-1.155-2.36-.362-.6-.561-1.247-.796-1.892-.093-.259-.24-.496-.39-.797l-3.108 1.563c.146.372.269.698.402 1.02.368.896.742 1.788 1.11 2.683.05.121.09.25.115.38.114.576.029.789-.426.924-.348.103-.632.314-.945.475-.159.081-.33.136-.482.197-.92-1.426-1.555-2.95-2.281-4.497l-.993.408c.143.466.249.893.405 1.3.325.849.68 1.686 1.018 2.53.205.513.42 1.023.6 1.545.14.401.086.51-.291.689-.553.263-1.11.518-1.673.76-.346.148-.36.134-.524-.199-.42-.85-.863-1.689-1.248-2.556-.278-.626-.466-1.295-.715-1.936-.212-.546-.459-1.076-.678-1.619-.154-.38-.28-.773-.433-1.154a3.308 3.308 0 0 0-.263-.502c-.186-.303-.15-.412.17-.555 1.52-.682 3.04-1.365 4.555-2.058.907-.415 1.808-.842 2.706-1.278.577-.28 1.138-.597 1.716-.873.579-.277 1.173-.518 1.756-.786.165-.075.324-.175.47-.287.156-.121.294-.157.456-.016.14.122.289.231.452.36M44.307 7.87c.625-.16 1.205-.243 1.723-.518.792-.422 1.15-1.131 1.402-1.94.336-1.085-.414-2.152-1.34-2.566-.85-.38-1.724-.229-2.62-.065.02 1.724.515 3.351.835 5.09m1.625 2.244l-1.186.143c0 .247-.008.459.001.67.035.785.07 1.571.115 2.356.017.29-.03.409-.334.447-.487.06-.98.072-1.469.116-.247.022-.491.067-.736.104-.094.014-.187.041-.282.047-.278.019-.43-.118-.463-.39-.115-.948-.245-1.894-.347-2.843-.091-.843-.144-1.69-.229-2.533-.097-.966-.204-1.931-.32-2.895-.114-.933-.233-1.866-.37-2.796-.082-.549-.205-1.092-.304-1.64-.016-.085-.003-.176-.003-.275.443-.074.873-.162 1.308-.214.879-.107 1.758-.237 2.642-.28C45.077.078 46.2-.122 47.33.109c.334.068.692-.004 1.01.188.592.355 1.2.678 1.578 1.289.288.463.575.917.756 1.436.543 1.554.373 3.045-.444 4.457-.276.478-.68.89-1.048 1.314-.211.243-.246.262-.049.497.391.466.803.916 1.195 1.381.53.63 1.058 1.263 1.571 1.906.187.234.113.42-.193.457-.456.056-.918.066-1.378.094-.412.024-.829.016-1.235.074-.386.055-.583-.192-.726-.424-.39-.635-.972-1.097-1.466-1.638-.303-.332-.616-.654-.968-1.025M74.731 87.863c.864 1.333 1.934 2.45 3.002 3.63.388-.362.739-.705 1.106-1.028.728-.64.962-1.945.118-2.95-.563-.671-1.24-.987-2.12-.748-.068.02-.143.02-.215.023-.8.023-1.398.4-1.89 1.073M86 92.353c-.164.176-.238.325-.351.366-.521.188-.939.53-1.34.886-.749.668-1.262.591-2.153.228a66.673 66.673 0 0 0-2.069-.794c-.077-.029-.197.005-.276.049-.254.138-.497.295-.77.46.516.747.885 1.554 1.488 2.21.308.336.276.518-.118.746a5.242 5.242 0 0 0-1.3 1.082c-.076.087-.133.192-.21.277-.161.174-.332.187-.487.013-.29-.325-.563-.664-.84-1-.222-.269-.446-.536-.655-.815a57.49 57.49 0 0 1-1.025-1.408 144.327 144.327 0 0 1-1.536-2.222c-.35-.517-.662-1.06-1.02-1.57-.477-.677-.985-1.333-1.476-2-.25-.34-.496-.682-.74-1.026-.163-.229-.178-.34.048-.52.61-.489 1.234-.964 1.87-1.418.52-.369 1.065-.7 1.599-1.048.049-.032.092-.081.145-.096.571-.162 1.082-.472 1.676-.595.504-.105 1.006-.176 1.509-.154.877.039 1.674.334 2.339.93a6.424 6.424 0 0 1 1.618 2.237c.292.672.373 1.4.278 2.138-.043.33-.08.662-.131.992-.031.192.046.293.214.373.955.454 1.907.918 2.862 1.373.115.055.25.066.373.108.13.046.255.105.478.198M14.79 69.672l-1.744.494c-.853.242-1.707.477-2.558.725-.632.185-1.254.408-1.89.572a32.27 32.27 0 0 1-2.008.425c-.32.06-.654.14-.97.102-1.182-.14-2.298-.485-3.191-1.398-.392-.4-.813-.772-1.033-1.326-.05-.126-.128-.246-.15-.377-.111-.66-.28-1.314-.24-1.997.028-.486.008-.978.064-1.46.078-.673.387-1.259.665-1.86.306-.66.75-1.184 1.258-1.65.268-.244.58-.442.89-.626.906-.535 1.867-.893 2.907-.986.18-.016.353-.116.533-.161.816-.206 1.636-.394 2.45-.612.384-.103.752-.283 1.138-.381a6.408 6.408 0 0 1 1.056-.154c.302-.024.526.148.625.446.218.663.431 1.328.641 1.993.107.339.021.508-.308.609-.206.063-.413.132-.624.162-1.15.165-2.241.568-3.34.943-.365.124-.749.18-1.122.276-.567.146-1.134.291-1.698.45-.677.19-1.342.415-1.871.942a1.511 1.511 0 0 0-.46 1.27c.051.484.103.976.232 1.44.266.956 1.04 1.44 1.96 1.252 1.19-.245 2.374-.514 3.56-.777.92-.204 1.84-.407 2.758-.626.5-.119.993-.274 1.491-.403.415-.107.595-.034.751.373.156.406.273.83.382 1.255.094.363.086.726-.154 1.065M56.207 10.482c.685.133 1.302.249 1.916.373.547.11 1.092.232 1.638.346.434.09.869.18 1.304.266.084.017.172.01.257.023.49.078.531.124.455.618-.095.615-.208 1.228-.321 1.888-.158 0-.297.01-.434-.001-.745-.056-1.491-.094-2.232-.183a26.133 26.133 0 0 1-2.201-.36c-.673-.14-1.329-.361-2-.508a4.126 4.126 0 0 0-1.026-.077c-.49.018-.614-.103-.546-.598.096-.688.172-1.379.272-2.066.162-1.12.33-2.238.509-3.355.052-.326.158-.642.226-.965.026-.122.007-.253.016-.38.045-.622.083-1.246.143-1.867.056-.576.128-1.15.211-1.722.033-.229.143-.447.166-.675.027-.265-.002-.536-.009-.883L54.79 0c.64.1 1.27.203 1.9.296.34.05.681.09 1.023.125.44.046.882.083 1.323.124.072.008.147.008.213.032.748.271 1.535.334 2.314.43.34.043.688.04 1.032.046.278.005.433.138.4.412-.08.687-.178 1.373-.273 2.09-.06.017-.14.06-.218.058-.638-.01-1.27.035-1.91-.148-.794-.227-1.62-.35-2.437-.485-.307-.05-.629-.008-.95-.008-.348 1.1-.17 2.225-.436 3.306.114.04.191.076.273.094.53.113 1.056.253 1.59.323.427.055.846.121 1.263.23.4.105.813.156 1.213.261.097.026.24.178.233.262-.06.718-.075 1.444-.272 2.192-.39-.046-.754-.097-1.119-.13-.725-.067-1.453-.12-2.178-.186-.314-.029-.627-.07-.94-.112-.365-.05-.42-.008-.478.365-.044.283-.093.566-.15.905M36.586 4.241c-.363.182-.653.384-.973.475-.709.202-1.323.603-1.992.886-.486.205-.962.44-1.436.676-.227.113-.437.26-.641.383.087.454 1.044 2.695 1.295 3.035.443-.146.899-.295 1.353-.448.756-.256 1.51-.514 2.265-.774.216-.074.427-.163.643-.236.394-.135.544-.088.718.301.262.589.491 1.193.758 1.849-.39.188-.768.385-1.158.554-1.01.437-2.027.855-3.036 1.294-.366.16-.384.233-.286.63.151.613.205.633.774.384.614-.269 1.236-.52 1.856-.776.95-.393 1.901-.785 2.853-1.175.238-.097.384-.055.497.172.29.579.573 1.162.844 1.75.134.288.117.362-.187.51a9.967 9.967 0 0 1-1.341.56c-.993.312-1.923.768-2.868 1.192-.44.197-.895.36-1.334.56-.337.153-.66.34-.99.508-.242.124-.484.247-.73.363-.322.152-.475.115-.617-.212-.31-.714-.595-1.437-.89-2.157-.169-.414-.325-.834-.505-1.243-.338-.765-.696-1.521-1.033-2.287-.22-.501-.412-1.015-.628-1.518-.306-.716-.62-1.429-.936-2.14-.252-.567-.523-1.125-.77-1.694-.163-.378-.126-.446.265-.536.795-.184 1.542-.481 2.274-.846.819-.408 1.675-.739 2.503-1.128.465-.218.902-.495 1.36-.727a6.78 6.78 0 0 1 .906-.387c.266-.089.37-.033.465.229.082.228.147.47.17.71.03.297.146.542.304.782.083.126.14.27.248.481M26.657 95.305c.778.408 1.483.846 2.239 1.244.232-1.179.511-2.275.619-3.405l-.469-.253c-.465.44-.924.873-1.382 1.308-.064.06-.157.124-.17.2-.058.322-.313.446-.528.616-.09.07-.167.156-.31.29M24.82 97.56l-1.127.953c-.37-.248-.768-.55-1.198-.792-.366-.205-.764-.351-1.156-.502-.181-.07-.303-.166-.339-.392l1.32-1.151c.634-.551 1.266-1.103 1.9-1.653.722-.627 1.449-1.248 2.167-1.88.618-.544 1.217-1.114 1.843-1.648.547-.466 1.13-.887 1.677-1.35.3-.256.566-.556.842-.841.352-.367.645-.4 1.021-.103.308.242.614.488.925.725.342.261.34.293.262.71-.232 1.223-.48 2.445-.66 3.677-.122.829-.118 1.676-.208 2.51-.079.73-.215 1.454-.315 2.181-.108.789-.197 1.58-.308 2.367-.106.758-.211 1.516-.352 2.267-.08.427-.304.472-.59.163-.05-.054-.096-.12-.157-.154-.444-.252-.892-.495-1.336-.746a3.231 3.231 0 0 1-.403-.262c-.174-.136-.229-.284-.165-.541.091-.374.08-.775.116-1.163.017-.2-.071-.322-.252-.362-.516-.114-.881-.502-1.318-.76-.705-.417-1.42-.814-2.189-1.253M92.992 67.871c-.013.205-.023.217.092.316.2.173.418.326.621.496.605.509 1.204 1.024 1.81 1.53.107.09.237.148.35.217.19-.929.37-1.803.555-2.712l-3.428.153M102 64c-.057.337-.075.581-.141.81a76.37 76.37 0 0 1-.663 2.154c-.114.35-.16.357-.507.338-.28-.016-.56.006-.839-.014-.254-.018-.377.117-.45.343-.178.551-.37 1.097-.532 1.653-.213.736-.404 1.48-.602 2.22-.028.103-.034.214-.064.316-.062.217.02.357.2.453.184.098.366.199.549.297.127.068.256.134.393.206-.108.417-.18.81-.313 1.178a4.122 4.122 0 0 0-.23 1.587c.006.148.06.332-.123.402-.192.073-.388.099-.57-.064a57.57 57.57 0 0 0-1.409-1.228 557.908 557.908 0 0 0-3.392-2.812c-.45-.37-.931-.704-1.365-1.095-1.076-.971-2.239-1.838-3.24-2.904-.101-.108-.214-.223-.344-.28-.277-.123-.352-.344-.357-.628-.01-.531.089-1.031.374-1.478.131-.205.304-.28.56-.276a69.53 69.53 0 0 0 3.085-.027c.926-.03 1.85-.108 2.775-.15.57-.027 1.14-.003 1.709-.045.477-.036.95-.142 1.427-.205.335-.045.671-.088 1.008-.1.908-.034 1.74-.444 2.625-.582L102 64M22.418 82.422c-.237.21-.477.386-.671.603-.496.553-.938 1.154-1.614 1.525-.177.098-.31.273-.479.426.058.088.096.167.153.228.483.525.97 1.047 1.457 1.568.06.064.13.123.205.172.133.088.22.152.236.36.014.178.256.343.405.507.08.088.187.152.262.242.391.464.374.672-.077 1.076-.266.238-.528.48-.802.709-.26.217-.325.214-.576.001a3.553 3.553 0 0 1-.355-.34c-.486-.544-1.008-1.047-1.605-1.472-.049-.034-.112-.064-.137-.112-.255-.478-.826-.566-1.175-1.002-.357.325-.692.612-1.006.921-.455.448-.907.902-1.336 1.375-.17.188-.317.206-.496.063-.265-.213-.52-.438-.78-.658-.271-.23-.55-.452-.813-.691-.102-.093-.167-.226-.214-.29.516-.611 1.018-1.159 1.464-1.748.25-.332.404-.753.746-1.003.455-.332.792-.772 1.188-1.155.643-.622 1.25-1.28 1.867-1.928.307-.322.608-.65.9-.984.536-.616 1.052-1.248 1.599-1.853.287-.318.615-.6.938-.885.066-.058.206-.097.28-.067.069.03.11.155.138.246.032.105-.004.257.06.32.15.152.338.268.52.387.08.053.197.06.27.12.307.253.603.521.908.779.101.086.218.153.323.235.093.072.195.14.265.23.476.627.986 1.22 1.608 1.714.08.064.134.157.207.23.166.168.33.337.505.496.33.299.675.582.997.889.287.272.286.496.017.806-.106.122-.228.231-.348.342-.294.272-.602.53-.885.814-.355.357-.481.357-.777-.049a.475.475 0 0 0-.121-.126c-.495-.31-.796-.794-1.153-1.228-.11-.135-.247-.25-.381-.363-.488-.414-.98-.824-1.47-1.235-.057-.047-.116-.092-.247-.195M16.802 70c.334.607.605 1.163.93 1.68.657 1.041 1.36 2.049 2.008 3.096.291.47.49 1.005.75 1.5.095.182.236.34.37.495.2.231.187.589-.05.752-.517.354-1.038.7-1.56 1.047-.045.03-.104.038-.181.064-1-1.584-1.755-3.333-2.904-4.878-.389.275-.738.506-1.07.762-.557.429-1.101.874-1.714 1.214-.452.25-.465.327-.184.818.336.589.7 1.16 1.032 1.75.229.406.42.835.637 1.248.104.2.233.386.342.583.175.314.144.513-.14.703-.58.389-1.17.761-1.796 1.166-.127-.196-.25-.36-.347-.542-.402-.743-.798-1.489-1.193-2.236-.205-.387-.4-.78-.607-1.166-.099-.184-.214-.359-.344-.574l-3.294 1.89c-.115-.145-.288-.285-.36-.47-.249-.633-.71-1.115-1.017-1.704-.147-.283-.172-.357.082-.53.518-.351 1.057-.666 1.59-.99.93-.567 1.91-1.035 2.786-1.714.45-.348.954-.615 1.437-.914.543-.336 1.095-.656 1.633-1.001.368-.236.719-.503 1.077-.757.554-.395 1.103-.8 1.666-1.18.122-.083.294-.08.421-.112M72.582 5c.271.136.52.236.74.377.707.451 1.473.782 2.242 1.11.126.053.259.098.37.172.607.401 1.214.801 1.808 1.22.771.543 1.65.894 2.46 1.372.51.301 1.038.573 1.55.872.278.163.318.333.143.596-.366.553-.74 1.101-1.124 1.643-.217.307-.421.34-.645.055-.348-.443-.828-.705-1.283-1.003-.189-.123-.409-.201-.616-.297-.204-.095-.349-.02-.466.152-.194.286-.4.564-.59.854-.616.947-1.211 1.908-1.843 2.845-.582.862-1.166 1.727-1.815 2.54-.529.663-1.084 1.295-1.436 2.075-.202.45-.423.504-.885.313-.343-.142-.634-.328-.87-.632-.242-.315-.629-.454-1.019-.544-.21-.049-.21-.043-.303-.23.573-.944 1.127-1.857 1.683-2.769.479-.783.963-1.563 1.44-2.347.266-.438.52-.882.783-1.322.523-.879 1.053-1.754 1.567-2.638.047-.08.022-.227-.018-.323a.522.522 0 0 0-.214-.229c-.785-.454-1.512-1.008-2.372-1.335a.282.282 0 0 1-.042-.019c-.162-.09-.47-.003-.478-.261-.007-.224.07-.472.182-.672.145-.26.373-.472.542-.72.168-.247.308-.513.509-.855M39.578 101.817c.14.046.262.106.392.127.596.096 1.156.304 1.722.505.493.175 1.02.253 1.529.385.492.128.987.252 1.47.412.287.095.338.224.296.527-.084.608-.17 1.215-.267 1.821-.065.398-.21.49-.598.334-.467-.188-.955-.252-1.441-.347-.66-.13-1.307-.322-1.959-.488-.014-.004-.028-.012-.043-.013-.999-.055-1.906-.519-2.893-.646-.514-.066-1.012-.264-1.515-.411-.175-.052-.28-.178-.27-.371.004-.105.01-.213.034-.315.22-.951.455-1.9.664-2.855.187-.852.336-1.712.52-2.566.288-1.337.591-2.67.887-4.006.163-.733.328-1.465.485-2.2.047-.217.07-.439.111-.71.218.011.421.007.62.035.593.084 1.186.172 1.776.279.183.033.435.08.511.207.099.163.072.415.062.627-.007.147-.082.289-.117.435-.388 1.641-.791 3.278-1.154 4.925-.294 1.337-.54 2.685-.804 4.028-.017.085-.012.174-.018.28"/></g></svg>
                </div>
                <p className={styles.copyright}>&copy; WTBR {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer
