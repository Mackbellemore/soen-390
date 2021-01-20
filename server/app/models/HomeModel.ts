export class HomeModel {
	constructor(homeModel: HomeModel) {
		this.name = homeModel.name;
	}
    
    public name: string;
    public compoundMember: CompoundMember;
}

interface CompoundMember {
    id: string;
}
