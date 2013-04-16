/**
 * AUTHOR: mrassinger
 * COPYRIGHT: E2E Technologies Ltd.
 */

var nodeUtilsModule = require('util');
var BPMNFlowObject = require("./flowObject.js").BPMNFlowObject;

/**
 * Subsumes all kind of tasks
 * @param {String} bpmnId
 * @param {String} name
 * @param {String} type
 * @constructor
 */
function BPMNActivity(bpmnId, name, type) {
    BPMNFlowObject.call(this, bpmnId, name, type);
    this.isActivity = true;
}
exports.BPMNActivity = BPMNActivity;
nodeUtilsModule.inherits(BPMNActivity, BPMNFlowObject);

