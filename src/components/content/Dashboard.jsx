import React, { Fragment } from "react";
import SectionHeader from "./../common/SectionHeader";
import StatisticWidget from "./StatisticWidget";
import { connect } from "react-redux";
import RecentWidget from "./RecentWidget";
import getDataActions from "./../../actions/DataActions";
import ViewsDiagramWidget from "./ViewsDiagramWidget";
import TopAuthorsWidget from "./TopAuthorsWidget";
import TopShowsWidget from "./TopShowsWidget";
import TodayEpisodesWidget from "./TodayEpisodesWidget";
import { authorize } from "./../../js/Utility";
import text from "../../langs/lang";

class Dashboard extends React.Component {
    getShowsByCategory() {
        let movies = [],
            anime = [],
            tvshows = [];

        this.props.shows.forEach((show) => {
            switch (show.category) {
                case "movie":
                    movies.push(show);
                    break;

                case "tvshow":
                    tvshows.push(show);
                    break;

                case "anime":
                    anime.push(anime);
                    break;

                default:
            }
        });

        return { movies, anime, tvshows };
    }

    getAuthorizedShowsId() {
        const { loggedUser, shows } = this.props;

        if (authorize(loggedUser.role, "supervisor")) return shows;

        return shows
            .filter((show) => show.authorId === loggedUser.id)
            .map((show) => show.id);
    }

    getAuthorizedEpisodesNo() {
        const { loggedUser, episodes } = this.props;

        if (authorize(loggedUser.role, "supervisor")) return episodes;

        return episodes
            .filter((episode) => episode.authorId === loggedUser.id)
            .map((episode) => [episode.showId, episode.episodeNo]);
    }

    getItemsByStatus(items) {
        let approvedItems = [],
            unapprovedItems = [];

        items.forEach((item) => {
            if (item.status === "approved") {
                approvedItems.push(item);
            } else {
                unapprovedItems.push(item);
            }
        });

        return { approvedItems, unapprovedItems };
    }

    getUsersByStatus() {
        let activeUsers = [],
            bannedUsers = [];
        this.props.users.forEach((user) => {
            if (user.status === "active") {
                activeUsers.push(user);
            } else {
                bannedUsers.push(user);
            }
        });

        return { activeUsers, bannedUsers };
    }

    render() {
        const {
            reviews,
            comments,
            reports,
            loggedUser,
            fixReportAction,
            changeCommentStatus,
            changeReviewStatus,
            forms: {
                settings: {
                    data: { site_content: siteContent },
                },
            },
        } = this.props;
        const { movies, anime, tvshows } = this.getShowsByCategory();
        const {
            approvedItems: approvedReviews,
            unapprovedItems: unapprovedReviews,
        } = this.getItemsByStatus(reviews);
        const {
            approvedItems: approvedComments,
            unapprovedItems: unapprovedComments,
        } = this.getItemsByStatus(comments);
        const { activeUsers, bannedUsers } = this.getUsersByStatus();
        const authorizedShowsId = this.getAuthorizedShowsId();
        const authorizedEpisodesNo = this.getAuthorizedEpisodesNo();

        return (
            <Fragment>
                {authorize(loggedUser.role, "supervisor") && (
                    <Fragment>
                        <SectionHeader
                            name={text("overview")}
                            faClass="fas fa-chart-pie"
                        />

                        <div
                            id="statistics-container"
                            className={
                                loggedUser.role === "supervisor" ? "three" : ""
                            }
                        >
                            <StatisticWidget
                                title={text("shows")}
                                typeClass="shows"
                                data={siteContent.map((content) => {
                                    switch (content) {
                                        case "anime":
                                            return {
                                                label: text("anime"),
                                                counter: anime.length,
                                            };
                                        case "tvshows":
                                            return {
                                                label: text("tv_shows"),
                                                counter: tvshows.length,
                                            };
                                        case "movies":
                                        default:
                                            return {
                                                label: text("movies"),
                                                counter: movies.length,
                                            };
                                    }
                                })}
                                moreLink="/shows"
                                faClass="fas fa-film"
                            />

                            <StatisticWidget
                                title={text("comments")}
                                typeClass="comments"
                                data={[
                                    {
                                        label: text("approved"),
                                        counter: approvedComments.length,
                                    },
                                    {
                                        label: text("unapproved"),
                                        counter: unapprovedComments.length,
                                    },
                                ]}
                                moreLink="/comments"
                                faClass="fas fa-comments"
                            />

                            <StatisticWidget
                                title={text("reviews")}
                                typeClass="reviews"
                                data={[
                                    {
                                        label: text("approved"),
                                        counter: approvedReviews.length,
                                    },
                                    {
                                        label: text("unapproved"),
                                        counter: unapprovedReviews.length,
                                    },
                                ]}
                                moreLink="/reviews"
                                faClass="fas fa-star-half-alt"
                            />

                            {authorize(loggedUser.role, "admin") && (
                                <StatisticWidget
                                    title={text("users")}
                                    typeClass="users"
                                    data={[
                                        {
                                            label: text("active_users"),
                                            counter: activeUsers.length,
                                        },
                                        {
                                            label: text("banned_users"),
                                            counter: bannedUsers.length,
                                        },
                                    ]}
                                    moreLink="/users"
                                    faClass="fas fa-user"
                                />
                            )}
                        </div>
                    </Fragment>
                )}

                <div id="main-side">
                    {authorize(loggedUser.role, "supervisor") && (
                        <ViewsDiagramWidget />
                    )}

                    <TodayEpisodesWidget />

                    <div id="top-lists-widgets">
                        <TopShowsWidget />
                        <TopAuthorsWidget />
                    </div>
                </div>

                <div id="end-side">
                    <RecentWidget
                        title={text("reports")}
                        faClass="fas fa-exclamation-circle"
                        onPhrase={text("report_on")}
                        doBtnLabel={text("fixed")}
                        showMoreLink="/reports"
                        data={
                            authorize(loggedUser.role, "supervisor")
                                ? reports
                                : reports.filter((report) => {
                                      if (report.episodeNo === null) {
                                          return authorizedShowsId.includes(
                                              report.showId
                                          );
                                      } else {
                                          return authorizedEpisodesNo.some(
                                              ([showId, episodeNo]) => {
                                                  return (
                                                      report.showId ===
                                                          showId &&
                                                      report.episodeNo ===
                                                          episodeNo
                                                  );
                                              }
                                          );
                                      }
                                  })
                        }
                        doBtnAction={(id) => {
                            const isDelete = window.confirm(
                                text("are_you_sure_you_fixed_this_report")
                            );
                            isDelete && fixReportAction(id);
                        }}
                    />

                    <RecentWidget
                        title={text("comments")}
                        faClass="fas fa-comments"
                        onPhrase={text("comment_on")}
                        doBtnLabel={text("approve_?")}
                        showMoreLink="/comments"
                        data={
                            authorize(loggedUser.role, "supervisor")
                                ? comments
                                : comments.filter((comment) =>
                                      authorizedEpisodesNo.some(
                                          ([showId, episodeNo]) => {
                                              return (
                                                  comment.showId === showId &&
                                                  comment.episodeNo ===
                                                      episodeNo
                                              );
                                          }
                                      )
                                  )
                        }
                        doBtnCondition={(item) => item.status !== "approved"}
                        doBtnAction={(id) => {
                            changeCommentStatus([id], "approve");
                        }}
                    />

                    <RecentWidget
                        title={text("reviews")}
                        faClass="fas fa-star-half-alt"
                        onPhrase={text("rate")}
                        doBtnLabel={text("approve_?")}
                        showMoreLink="/reviews"
                        data={
                            authorize(loggedUser.role, "supervisor")
                                ? reviews
                                : reviews.filter((review) =>
                                      authorizedShowsId.includes(review.showId)
                                  )
                        }
                        doBtnCondition={(item) => item.status !== "approved"}
                        doBtnAction={(id) => {
                            changeReviewStatus([id], "approve");
                        }}
                    />
                </div>
            </Fragment>
        );
    }
}

export default connect((state) => state, {
    fixReportAction: getDataActions("reports").deleteData,
    changeCommentStatus: getDataActions("comments").changeStatus,
    changeReviewStatus: getDataActions("reviews").changeStatus,
})(Dashboard);
