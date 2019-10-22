import * as _ from "lodash";

import { BaseAction } from "./BaseAction";
import { DiagramEngine } from "../DiagramEngine";
import { NodeModel } from "../models/NodeModel";
import { PointModel } from "../models/PointModel";
import { SelectionModel } from "../models/SelectionModel";

export class MoveItemsAction extends BaseAction {
	selectionModels: SelectionModel[];
	moved: boolean;

	constructor(mouseX: number, mouseY: number, diagramEngine: DiagramEngine) {
		super(mouseX, mouseY);
		this.moved = false;
		diagramEngine.enableRepaintEntities(diagramEngine.getDiagramModel().getSelectedItems());
		var selectedItems = diagramEngine.getDiagramModel().getSelectedItems();

		//dont allow items which are locked to move
		selectedItems = selectedItems.filter(item => {
			return !diagramEngine.isModelLocked(item);
		});

		this.selectionModels = selectedItems.map((item: PointModel | NodeModel) => {
			const initialPortCoords = {};
			if (item instanceof NodeModel) {
				_.forEach(item.getPorts(), port => {
					initialPortCoords[port.id] = {initialX: port.x, initialY: port.y};
				})
			}
			
			return {
				model: item,
				initialX: item.x,
				initialY: item.y,
				initialPortCoords 
			};
		});
	}
}
