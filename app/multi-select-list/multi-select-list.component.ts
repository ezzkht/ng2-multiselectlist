import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'multi-select-list',
    templateUrl: 'app/multi-select-list/multi-select-list.component.html',
    styleUrls: ['app/multi-select-list/multi-select-list.css']
})
export class MultiSelectListComponent implements OnInit {
    @Input()
    available: Array<any> = [];
    
    @Input()
    selection: Array<any> = [];
    
    @Input()
    displayAttr: string;
    
    @Input()
    allowSorting: boolean;
    
    @Input()
    availableLabel: string;
    
    @Input()
    selectedLabel: string;
    
    @Input()
    availablePlaceHolder: string;
    
    @Input()
    selectedPlaceHolder: string;
    
    @Output()
    selectionChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    
    @Output()
    select: EventEmitter<any[]> = new EventEmitter<any[]>();
    
    @Output()
    deselect: EventEmitter<any[]> = new EventEmitter<any[]>();
    
    @Output()
    change: EventEmitter<any> = new EventEmitter<any>();
    
    selected: any;
    filter1: string = '';
    filter2: string = '';
    _filterTerm1: any;
    _filterTerm2: any;
                
    constructor(private _ref: ChangeDetectorRef) {
        this.selected = {
            available: [],
            current: []
        };
    }
    
    ngOnInit() {
        //$q.all([dataLoading("model"), dataLoading("available")]).then(results => refreshAvailable());
        
        this.rebuildFilterTerm1();
        this.rebuildFilterTerm2();
        this.refreshAvailable();
    }
    
    onFilter1Changed() {
        this.rebuildFilterTerm1();
    }
    
    onFilter2Changed() {
        this.rebuildFilterTerm2();
    }
    
    onClearFilter1() {
        this.filter1 = "";
        this.onFilter1Changed();
    }
    
    onClearFilter2() {
        this.filter2 = "";
        this.onFilter2Changed();
    }
    
    private rebuildFilterTerm1() {
        this._filterTerm1 = { [this.displayAttr] : this.filter1 };
    }
    
    private rebuildFilterTerm2() {
        this._filterTerm2 = { [this.displayAttr] : this.filter2 };
    }
    
    private moveItem(arr: any[], from: any, to: any) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
    }
    
    /*dataLoading (scopeAttr) {
        var loading = $q.defer();
        if (scope[scopeAttr]) {
            loading.resolve(scope[scopeAttr]);
        } else {
            scope.$watch(scopeAttr, function(newValue, oldValue) {
                if (newValue !== undefined)
                    loading.resolve(newValue);
            });
        }
        return loading.promise;
    }*/

    // Filters out items in original that are also in toFilter
    private filterOut(original: Array<any>, filter: Array<any>) {
        let filtered: any[] = [];
        
        for(let i = 0; i < original.length; i++) {
            let item = original[i];
            let match = false;
            
            for (let j = 0; j < filter.length; j++) {
                if (filter[j][this.displayAttr] == item[this.displayAttr]) {
                    match = true;
                    break;
                }
            }
            
            if (!match) {
                filtered.push(item);
            }
        }
        
        return filtered;
    }
    
    refreshAvailable() {
        this.available = this.filterOut(this.available, this.selection);
        this.selected.available = [];
        this.selected.current = [];
    }
    
    add() {
        this.selection = this.selection.concat(this.selected.available);
        this.notifyAdd();
        this.refreshAvailable();
    }
    
    addAll() {
        this.selection = this.selection.concat(this.available);
        this.notifyAddAll();
        this.refreshAvailable();
    }
    
    remove() {
        this.available = this.available.concat(this.selected.current);
        this.selection = this.filterOut(this.selection, this.selected.current);
        this.notifyRemove();
        this.refreshAvailable();
    }
    
    removeAll() {
        this.available = this.available.concat(this.selection);
        this.selection = [];
        this.notifyRemoveAll();
        this.refreshAvailable();
    }
    
    moveUp() {
        this.selected.current.forEach((item: any) => {
            let idx = this.selection.indexOf(item);
            this.moveItem(this.selection, idx, idx-1);
        });

        //this._ref.markForCheck();
        this.selection = [].concat(this.selection);
        this.notifyChange();
    }
    
    moveDown() {
        for (let i = this.selected.current.length-1; i >= 0; i--) {
            let idx = this.selection.indexOf(this.selected.current[i]);
            this.moveItem(this.selection, idx, idx+1);
        }
        
        /*this.selected.current.forEach(item => {
            let idx = this.selection.indexOf(item);
            this.moveItem(this.selection, idx, idx+1);
        });*/

        this.selection = [].concat(this.selection);
        this.notifyChange();
    }
    
    canMoveUp(): boolean {
        let result: boolean = true;
        
        if (this.selected.current.length) {
            this.selected.current.forEach((item: any) => {
                if (result && this.selection.indexOf(item) == 0)
                    result = false;
            });
        } else {
            result = false;
        }
        
        return result;
    }
    
    canMoveDown(): boolean {
        let result: boolean = true;
        
        if (this.selected.current.length) {
            this.selected.current.forEach((item: any) => {
                if (result && this.selection.indexOf(item) == this.selection.length-1)
                    result = false;
            });
        } else {
            result = false;
        }
        
        return result;
    }
    
    notifyAdd() {
        this.select.emit(this.selected.available);
        this.notifyChange();
    }
    
    notifyRemove() {
        this.deselect.emit(this.selected.current);
        this.notifyChange();
    }
    
    notifyAddAll() {
        this.select.emit(this.available);
        this.notifyChange();
    }
    
    notifyRemoveAll() {
        this.deselect.emit(this.selection);
        this.notifyChange();
    }
    
    notifyChange() {
        this.change.emit(null);
        this.selectionChange.emit(this.selection);
    }
}
