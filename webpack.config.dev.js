// path ya esta disponible en node asi que no se necesita ninguna dependencia. path es un elemento ya integrado en el script de node
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Añadimos nuestro plugin a nuestro documento
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Añadimos el soporte para copy-webpack
const CopyPlugin = require('copy-webpack-plugin');

// NO HACE FALTA OPTIMIZACION EN MODO DESARROLLO
// // Optimization for.
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

// .env
const Dotenv = require('dotenv-webpack');

// Aqui añadimos todas las configuraciones
    // entry: ; Sirve para decir cual es el punto de entrada de nuestra aplicación.
    // output: { ... } ; Hacia donde se van a enviar lo que va a preparar webpack.
module.exports = {
    entry: './src/index.js',
    output: {
        // .resolve() Nos permite saber donde se encuentra nuestro proyecto en que directorio y poder utilizar; No vamos a tener problema con el nombre de la carpeta o donde estamos posicionados y se adapte al directorio donde esté
        // El segundo parametro es donde se va a encontrar los archivos del proyecto
        path: path.resolve(__dirname, 'dist'),
        // filename: 'nombreDelArchivoResultante', comunmente boundle o con un hash
        /* La [contenthash]sustitución agregará un hash único basado en el contenido de un activo. Cuando el contenido del activo cambie, [contenthash]también cambiará. */
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    // Webpack Watch
    watch: true,

    // ahora toca decir con que extenciones que vamos a trabajar en el proyecto para que los identifique. Ex: js, react, esbelt
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },

    // BABEL
    module: {
        rules: [
            {
                //Lo primero que tenemos que realizar es un test, nos permite saber que tipo de extenciones vamos a usar. se usa expresiones regulares.
                // todos los archivos que empiezen con m o (? = o) sea formato mjs (formato de los modulos) $ para cerrar, con / cerramos la expresion
                test: /\.m?js$/,
                // luego un exclude: /node_modules/, para excluir todos los modulos
                exclude: /node_modules/,
                // Decimos que loader vamos a usar, en este caso babel.
                use: {
                    loader: 'babel-loader'
                }
            },
            // Creamos el loader o la configuracion para nuestro loader de css
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                "sass-loader"
                ],
            },
            {
                // De esta forma agrego la configuracion y poder importar  los recursos.
                test: /\.png/,
                type:'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        // Estas son las caracteristicas que tienen nuestros recursos en tamaño y en el tipo de formato
                        mimetype: "application/font-woff",
                        // Agregamos .[contenthash]. para saber si algo ha cambiado. Si el hash cambia algo cambió.
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        // Si no agarra el font hay que agregarle un punto al lado del punto
                        publicPath: "./assets/fonts/",
                        esModule: false,
                    },
                }
            }
        ]
    },
    plugins: [
        // Añadimos los plugins que vamos a utilizar
        new HtmlWebpackPlugin({
            // Para que haga la inserccion de los elementos.
            inject: true,
            template: './public/index.html',
            // Cual va a ser el resultado de esto; va a poner todo el resultado dentro de la carpeta /dist/
            filename: './index.html'
        }),
        // Y tambien la utilizacion de nuestro plugin para el css de diferentes documentos para luego unirlos en 1 solo
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        // instanciamos 
        new CopyPlugin({
            // Aca van los elementos que vamos a usar
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
    // NO HACE FALTA OPTIMIZACION EN LA FASE DE DESARROLLO
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new CssMinimizerPlugin(),
    //         new TerserPlugin()
    //     ]
    // }
}