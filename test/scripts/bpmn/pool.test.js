/**
 * AUTHOR: mrassinger
 * COPYRIGHT: E2E Technologies Ltd.
 */

var pathModule = require('path');
var bpmnDefinitionsModule = require('../../../lib/bpmn/definitions.js');
var bpmnParserModule = require('../../../lib/bpmn/parser.js');

var fileName = pathModule.join(__dirname, "../../resources/bpmn/pool.bpmn");
var collaborations = bpmnDefinitionsModule.getBPMNCollaborationDefinitions(fileName);

exports.testGetCollaboratingParticipants = function(test) {
    var collaboration = collaborations[0];

    var collaboratingParticipants = collaboration.getCollaboratingParticipants("PROCESS_1");
    test.deepEqual(collaboratingParticipants,
        [
            {
                "bpmnId": "_8",
                "name": "My Second Process",
                "type": "participant",
                "processRef": "PROCESS_2",
                "bpmnFileName": fileName
            },
            {
                "bpmnId": "_14",
                "name": "My Third Process",
                "type": "participant",
                "processRef": "PROCESS_3",
                "bpmnFileName": fileName
            }
        ],
        "testGetCollaboratingParticipants."
    );

    test.done();
};

exports.testGetParticipantByProcessId = function(test) {
    var collaboration = collaborations[0];

    var processParticipant = collaboration.getParticipantByProcessId("PROCESS_1");
    test.deepEqual(processParticipant,
        {
            "bpmnId": "_2",
            "name": "My First Process",
            "type": "participant",
            "processRef": "PROCESS_1",
            "bpmnFileName": fileName
        },
        "testGetParticipantByProcessId."
    );

    test.done();
};

exports.testGetBPMNProcessDefinitionsOfCollaboratingProcesses = function(test) {
    var processDefinitions = bpmnDefinitionsModule.getBPMNProcessDefinitions(fileName);
    var process1 = processDefinitions[0];
    test.equal(process1.name, "My First Process", "testGetBPMNProcessDefinitionsOfCollaboratingProcesses: process 1 name == pool 1 name");
    var process2 = processDefinitions[1];
    test.equal(process2.name, "My Second Process", "testGetBPMNProcessDefinitionsOfCollaboratingProcesses: process 2 name == pool 2 name");

    test.deepEqual(process1.collaboratingParticipants,
        [
            {
                "bpmnId": "_8",
                "name": "My Second Process",
                "type": "participant",
                "processRef": "PROCESS_2",
                "bpmnFileName": fileName
            },
            {
                "bpmnId": "_14",
                "name": "My Third Process",
                "type": "participant",
                "processRef": "PROCESS_3",
                "bpmnFileName": fileName
            }
        ],
        "testGetBPMNProcessDefinitionsOfCollaboratingProcesses"
    );

    test.done();
};

exports.testGetBPMNCollaborationDefinitions = function(test) {
    test.deepEqual(collaborations,
        [
            {
                "bpmnId": "COLLABORATION_1",
                "participants": [
                    {
                        "bpmnId": "_2",
                        "name": "My First Process",
                        "type": "participant",
                        "processRef": "PROCESS_1",
                        "bpmnFileName": fileName
                    },
                    {
                        "bpmnId": "_8",
                        "name": "My Second Process",
                        "type": "participant",
                        "processRef": "PROCESS_2",
                        "bpmnFileName": fileName
                    },
                    {
                        "bpmnId": "_14",
                        "name": "My Third Process",
                        "type": "participant",
                        "processRef": "PROCESS_3",
                        "bpmnFileName": fileName
                    }
                ],
                "messageFlows": [
                    {
                        "bpmnId": "_12",
                        "name": null,
                        "type": "messageFlow",
                        "sourceRef": "_11",
                        "targetRef": "_10"
                    },
                    {
                        "bpmnId": "_13",
                        "name": null,
                        "type": "messageFlow",
                        "sourceRef": "_10",
                        "targetRef": "_9"
                    }
                ],
                "isCollaborationDefinition": true
            }
        ],
        "testGetBPMNCollaborationDefinitions."
    );

    test.done();
};

exports.testParseCollaborationsBetweenPools = function(test) {

    var bpmnProcessDefinitions = bpmnParserModule.parse(fileName);
    test.deepEqual(bpmnProcessDefinitions,
        [
            {
                "bpmnId": "COLLABORATION_1",
                "participants": [
                    {
                        "bpmnId": "_2",
                        "name": "My First Process",
                        "type": "participant",
                        "processRef": "PROCESS_1",
                        "bpmnFileName": fileName
                    },
                    {
                        "bpmnId": "_8",
                        "name": "My Second Process",
                        "type": "participant",
                        "processRef": "PROCESS_2",
                        "bpmnFileName": fileName
                    },
                    {
                        "bpmnId": "_14",
                        "name": "My Third Process",
                        "type": "participant",
                        "processRef": "PROCESS_3",
                        "bpmnFileName": fileName
                    }
                ],
                "messageFlows": [
                    {
                        "bpmnId": "_12",
                        "name": null,
                        "type": "messageFlow",
                        "sourceRef": "_11",
                        "targetRef": "_10"
                    },
                    {
                        "bpmnId": "_13",
                        "name": null,
                        "type": "messageFlow",
                        "sourceRef": "_10",
                        "targetRef": "_9"
                    }
                ],
                "isCollaborationDefinition": true
            },
            {
                "bpmnId": "PROCESS_1",
                "name": "Pool",
                "flowObjects": [
                    {
                        "bpmnId": "_3",
                        "name": "Start Event 1",
                        "type": "startEvent",
                        "isFlowObject": true,
                        "isStartEvent": true
                    },
                    {
                        "bpmnId": "_4",
                        "name": "Task 1",
                        "type": "task",
                        "isFlowObject": true,
                        "isActivity": true,
                        "isWaitActivity": true
                    },
                    {
                        "bpmnId": "_6",
                        "name": "End Event 1",
                        "type": "endEvent",
                        "isFlowObject": true,
                        "isEndEvent": true
                    }
                ],
                "sequenceFlows": [
                    {
                        "bpmnId": "_5",
                        "name": null,
                        "type": "sequenceFlow",
                        "sourceRef": "_3",
                        "targetRef": "_4",
                        "isSequenceFlow": true
                    },
                    {
                        "bpmnId": "_7",
                        "name": null,
                        "type": "sequenceFlow",
                        "sourceRef": "_4",
                        "targetRef": "_6",
                        "isSequenceFlow": true
                    },
                    {
                        "bpmnId": "_12",
                        "name": null,
                        "type": "sequenceFlow",
                        "sourceRef": "_11",
                        "targetRef": "_10",
                        "isSequenceFlow": true
                    },
                    {
                        "bpmnId": "_13",
                        "name": null,
                        "type": "sequenceFlow",
                        "sourceRef": "_10",
                        "targetRef": "_9",
                        "isSequenceFlow": true
                    }
                ],
                "processElementIndex": null,
                "sequenceFlowBySourceIndex": null,
                "sequenceFlowByTargetIndex": null,
                "boundaryEventsByAttachmentIndex": null,
                "nameMap": null,
                "isProcessDefinition": true,
                "collaboratingParticipants": []
            },
            {
                "bpmnId": "PROCESS_2",
                "name": "Pool",
                "flowObjects": [
                    {
                        "bpmnId": "_11",
                        "name": "Start Event 2",
                        "type": "startEvent",
                        "isFlowObject": true,
                        "isStartEvent": true
                    },
                    {
                        "bpmnId": "_10",
                        "name": "Task 2",
                        "type": "task",
                        "isFlowObject": true,
                        "isActivity": true,
                        "isWaitActivity": true
                    },
                    {
                        "bpmnId": "_9",
                        "name": "End Event 2",
                        "type": "endEvent",
                        "isFlowObject": true,
                        "isEndEvent": true
                    }
                ],
                "sequenceFlows": [
                    {
                        "bpmnId": "_12",
                        "name": null,
                        "type": "sequenceFlow",
                        "sourceRef": "_11",
                        "targetRef": "_10",
                        "isSequenceFlow": true
                    },
                    {
                        "bpmnId": "_13",
                        "name": null,
                        "type": "sequenceFlow",
                        "sourceRef": "_10",
                        "targetRef": "_9",
                        "isSequenceFlow": true
                    }
                ],
                "processElementIndex": null,
                "sequenceFlowBySourceIndex": null,
                "sequenceFlowByTargetIndex": null,
                "boundaryEventsByAttachmentIndex": null,
                "nameMap": null,
                "isProcessDefinition": true,
                "collaboratingParticipants": []
            },
            {
                "bpmnId": "PROCESS_3",
                "name": "Pool",
                "flowObjects": [
                    {
                        "bpmnId": "_15",
                        "name": "Start Event",
                        "type": "startEvent",
                        "isFlowObject": true,
                        "isStartEvent": true
                    },
                    {
                        "bpmnId": "_16",
                        "name": "Task 3",
                        "type": "task",
                        "isFlowObject": true,
                        "isActivity": true,
                        "isWaitActivity": true
                    },
                    {
                        "bpmnId": "_18",
                        "name": "End Event 3",
                        "type": "endEvent",
                        "isFlowObject": true,
                        "isEndEvent": true
                    }
                ],
                "sequenceFlows": [
                    {
                        "bpmnId": "_17",
                        "name": null,
                        "type": "sequenceFlow",
                        "sourceRef": "_15",
                        "targetRef": "_16",
                        "isSequenceFlow": true
                    },
                    {
                        "bpmnId": "_19",
                        "name": null,
                        "type": "sequenceFlow",
                        "sourceRef": "_16",
                        "targetRef": "_18",
                        "isSequenceFlow": true
                    }
                ],
                "processElementIndex": null,
                "sequenceFlowBySourceIndex": null,
                "sequenceFlowByTargetIndex": null,
                "boundaryEventsByAttachmentIndex": null,
                "nameMap": null,
                "isProcessDefinition": true,
                "collaboratingParticipants": []
            }
        ],
        "testParseCollaborationsBetweenPools");
    test.done();
};