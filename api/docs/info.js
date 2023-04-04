export const info = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Productos',
			version: '1.0.0',
			description: 'API para hacer compras con carrito'
		},
		servers: [
			{
				url: 'http://localhost:8080'
			}
			// {
			//     url: 'https://railway.app/myapp'
			// }
		]
	},
	apis: ['./src/docs/*.yml']
};
