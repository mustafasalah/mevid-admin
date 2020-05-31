import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class TableCell extends Component {
	renderLinksNav() {
		const { rowData } = this.props;
		const { linksNav = null } = this.props.column;

		if (linksNav) {
			return (
				<ul>
					{linksNav.map((link, i) => {
						if ((link.on && link.on(rowData)) || !link.on) {
							return (
								<li key={i}>
									<Link
										to={link.href.replace(
											/:(\w+)/gi,
											(match, prop) => rowData[prop]
										)}
										className={link.className}
									>
										<span>{link.label}</span>
									</Link>
								</li>
							);
						}
					})}
				</ul>
			);
		}

		return "";
	}

	renderContent() {
		const { column, data, rowData } = this.props;

		switch (column.type) {
			case "img":
				return (
					<img
						className="radius focus-shadow"
						src={data}
						alt={rowData.name}
					/>
				);

			case "link":
				return (
					<Fragment>
						<Link
							to={column.href.replace(
								/:(\w+)/gi,
								(match, prop) => rowData[prop]
							)}
						>
							{data}
						</Link>
						{this.renderLinksNav()}
					</Fragment>
				);

			case "custom":
				return column.render(rowData, this.renderLinksNav.bind(this));

			default:
				return (
					<Fragment>
						{data}
						{this.renderLinksNav()}
					</Fragment>
				);
		}
	}

	render() {
		return (
			<td className={this.props.column.classNames || ""}>
				{this.renderContent()}
			</td>
		);
	}
}

export default TableCell;
