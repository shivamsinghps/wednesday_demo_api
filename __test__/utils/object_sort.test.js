const _sort = require("../../src/util_functions/object_sort");


test("It sorts carslist based on distance", async () => {
	const result = _sort([{
		id: '1',
		distance: 2
	}, {
		id: '2',
		distance: 8
	}, {
		id: '3',
		distance: 4
	}, {
		id: '4',
		distance: 1
	}])
	console.log(result);
	expect(result)
		.toEqual([{
			id: '4',
			distance: 1
		}, {
			id: '1',
			distance: 2
		}, {
			id: '3',
			distance: 4
		}, {
			id: '2',
			distance: 8
		}]);
});
