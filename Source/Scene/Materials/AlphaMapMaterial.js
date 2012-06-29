/*global define*/
define([
        '../../Core/DeveloperError',
        './replaceMaterialChannels',
        '../../Shaders/Materials/AlphaMapMaterial'
    ], function(
        DeveloperError,
        replaceMaterialChannels,
        ShadersAlphaMapMaterial) {
    "use strict";

    /**
     *
     * The alpha map is a grayscale texture where black
     * is 0% alpha and white is 100% alpha. The background
     * color is black.
     *
     * @name AlphaMapMaterial
     * @constructor
     */
    function AlphaMapMaterial(template) {
        var t = template || {};

        /**
         * 2D grayscale alpha map texture.
         */
        this.texture = t.texture;

        /**
         * Number of texture repeats in the x direction.
         *
         * type {Number}
         */
        this.sRepeat = t.sRepeat || 1.0;

        /**
         * Number of texture repeats in the y direction.
         *
         * type {Number}
         */
        this.tRepeat = t.tRepeat || 1.0;

        /**
         * Channels used for sampling the texture.
         *
         * type {String}
         */
        this.channels = t.channels || 'r';
        this.shaderSource = replaceMaterialChannels(ShadersAlphaMapMaterial, 'alpha_map_material_channels', this.channels, 1);

        var that = this;
        this._uniforms = {
            u_texture : function() {
                if (typeof that.texture === 'undefined') {
                    throw new DeveloperError('Alpha map texture required.');
                }
                return that.texture;
            },
            u_repeat : function() {
                return {
                    x : that.sRepeat,
                    y : that.tRepeat
                };
            }
        };
    }

    AlphaMapMaterial.prototype._getShaderSource = function() {
        return '#line 0\n' +
               this.shaderSource;
    };

    return AlphaMapMaterial;
});

