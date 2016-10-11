exports.updatedAt = function(schema, options){
	schema.pre('save', function (next) {
		this.updated_at = new Date
		next()
	});
	if (options && options.index) {
		schema.path('updated_at').index(options.index);
	}
}