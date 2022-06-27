import React, { Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import SectionHeader from "../common/SectionHeader";
import { upperFirst } from "./../../js/Utility";
import FormSection from "../common/form/FormSection";
import FormField from "../common/form/FormField";
import getGenres from "./../services/getGenres";
import {
    getRates,
    getShowStatus,
    getAnimeSource,
    getAnimeStudios,
} from "./../services/showsInfoServices";
import AddMoreBtn from "./AddMoreBtn";
import ServerField from "./ServerField";
import VideoFileField from "./VideoFileField";
import FormSideSection from "./../common/form/FormSideSection";
import PosterField from "./PosterField";
import BackgroundField from "./BackgroundField";
import SquareImageField from "./SquareImageField";
import PublishFields from "./PublishFields";
import Gallery from "./Gallery";
import Arcs from "./Arcs";
import TagsField from "./TagsField";
import showFormActions from "./../../actions/ShowFormActions";
import getShows from "../services/showsServices";
import Loader from "./../common/Loader";
import { authorize } from "../../js/Utility";
import getDataActions from "./../../actions/DataActions";
import text, { genre_text, isRtl } from "../../langs/lang";

const paramTypeToDataType = new Map([
    ["movies", "movie"],
    ["anime", "anime"],
    ["tv-shows", "tvshow"],
]);

const typeDataToLabel = new Map([
    ["movie", text("movie")],
    ["anime", text("anime")],
    ["tvshow", text("tv_show")],
]);

const typeParamToLabel = new Map([
    ["movies", text("movie")],
    ["anime", text("anime")],
    ["tv-shows", text("tv_show")],
]);

const ShowForm = ({
    loggedUser,
    shows,
    data,
    onSubmit,
    onReset,
    onChange,
    onTypeChange,
    onShowImageDelete,
    onShowDataLoad,
    deleteShowHandler,
}) => {
    const history = useHistory();
    const params = useParams();
    const showType =
        typeParamToLabel.get(params.type) || typeDataToLabel.get(data.type);
    const showId = params.id && Number(params.id);
    let isMovie, isAnime, isTVShow;

    // validate the show id is integer number
    if (typeof showId === "number" && !Number.isInteger(showId)) {
        history.replace("/");
    }

    if (showType) {
        isMovie = showType === text("movie");
        isAnime = showType === text("anime");
        isTVShow = showType === text("tv_show");
    }

    useEffect(() => {
        (async () => {
            // To reset form fields to its default value
            // (if the user edit show and then go to new one this will delete edited show state)
            if (showId === undefined) {
                onReset();
                onTypeChange(paramTypeToDataType.get(params.type));
                return;
            }

            // loading show data from server side and set it in form state
            try {
                const showData = await getShows(showId);

                // Authorize this page
                if (
                    !authorize(loggedUser.role, "supervisor") &&
                    loggedUser.id !== +showData.author
                ) {
                    history.replace("/shows");
                }

                onShowDataLoad(showData);
            } catch (ex) {
                toast.error(
                    `${text("there_is_no_show_with_this_id")} ${showId}`,
                    {
                        autoClose: 2500,
                        onClose: () => history.goBack(),
                    }
                );
            }
        })();
    }, []);

    // change the show type in status according to type in url
    useEffect(() => {
        if (params.type) {
            const currentShowType = paramTypeToDataType.get(params.type);
            if (data.type !== currentShowType) onTypeChange(currentShowType);
        }
    }, [params.type]);

    return (
        <Fragment>
            <SectionHeader
                name={
                    showId
                        ? `${text("edit")} ${showType || text("show")}`
                        : isRtl()
                        ? `${showType || text("show")} ${text("new")}`
                        : `${text("new")} ${showType || text("show")}`
                }
                faClass={`fas ${showId ? "fa-edit" : "fa-plus fa-sm"}`}
            />
            {showType === undefined ? (
                <Loader />
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(data, () => {
                            history.push("/shows/");
                        });
                    }}
                >
                    <div id="main-side">
                        <FormSection
                            header={`${
                                isMovie
                                    ? text("movie_information")
                                    : isAnime
                                    ? text("anime_information")
                                    : text("tvshow_information")
                            }`}
                        >
                            <div className="row">
                                <div className="col-3-2">
                                    <FormField
                                        name="show.name"
                                        label={text("name")}
                                        type="text"
                                        placeholder={`${text(
                                            "e.g."
                                        )} The Pirates Of The Caribbean`}
                                        required
                                    />
                                </div>
                                <div className="col-3-1">
                                    <FormField
                                        name="show.genres"
                                        label={text("genres")}
                                        type="select"
                                        placeholder={text("select_genres")}
                                        options={getGenres(showType).map(
                                            (genre) => ({
                                                label: genre_text(genre),
                                                value: genre,
                                            })
                                        )}
                                        multiple
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3-2">
                                    <FormField
                                        label={text("another_name")}
                                        placeholder={text(
                                            "the_name_of_the_show_in_other_language"
                                        )}
                                        name="show.another_name"
                                        type="text"
                                    />
                                </div>
                                <div className="col-3-1">
                                    {isMovie ? (
                                        <FormField
                                            name="show.duration"
                                            className="time"
                                            label={text("duration")}
                                            type="text"
                                            placeholder={`XX hours XX min ${text(
                                                "or"
                                            )} XX min`}
                                        />
                                    ) : (
                                        <FormField
                                            name="show.season"
                                            label={text("season_no")}
                                            type="number"
                                            min="1"
                                            placeholder={`${text(
                                                "default"
                                            )}: ${text("none")}`}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3-2">
                                    <div className="row">
                                        <div className="col-2">
                                            <FormField
                                                name="show.release_year"
                                                className="date"
                                                label={text("release_year")}
                                                type="number"
                                                placeholder={`${text(
                                                    "e.g."
                                                )} 2020`}
                                                dateType="year"
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div className="col-2">
                                            <FormField
                                                name="show.score"
                                                label={text("score")}
                                                type="number"
                                                placeholder={`${text(
                                                    "e.g."
                                                )} 9`}
                                                style={{ width: 110 }}
                                                required
                                                htmlAfterField={
                                                    <span className="appendix">
                                                        {text("of")} 10
                                                    </span>
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-3-1">
                                    <FormField
                                        name="show.rate"
                                        label={text("the_show_rate")}
                                        type="select"
                                        defaultValue=""
                                        options={getRates()}
                                    />
                                </div>
                            </div>
                            {!isMovie && (
                                <div className="row">
                                    <div className="col-3-2">
                                        <div className="row">
                                            <div
                                                className={
                                                    isAnime ? "col-3" : "col-2"
                                                }
                                            >
                                                <FormField
                                                    name="show.episodes"
                                                    label={text("episodes_no")}
                                                    type="number"
                                                    placeholder={`${text(
                                                        "e.g."
                                                    )} 12`}
                                                    min="0"
                                                />
                                            </div>
                                            <div
                                                className={
                                                    isAnime ? "col-3" : "col-2"
                                                }
                                            >
                                                <FormField
                                                    name="show.status"
                                                    label={text(
                                                        "airing_status"
                                                    )}
                                                    type="select"
                                                    options={getShowStatus()}
                                                />
                                            </div>
                                            {isAnime && (
                                                <div className="col-3">
                                                    <FormField
                                                        name="show.source"
                                                        label={text(
                                                            "source_type"
                                                        )}
                                                        type="select"
                                                        defaultValue={text(
                                                            "manga"
                                                        )}
                                                        options={getAnimeSource()}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-3-1">
                                        {isAnime ? (
                                            <FormField
                                                name="show.studio"
                                                label={text("studio")}
                                                type="select"
                                                defaultValue={text("n/a")}
                                                options={[
                                                    {
                                                        label: text("n/a"),
                                                        value: "n/a",
                                                    },
                                                    ...getAnimeStudios(),
                                                ]}
                                                tags
                                            />
                                        ) : (
                                            <FormField
                                                name="show.release_date"
                                                className="date"
                                                label={text("release_date")}
                                                type="text"
                                                dateType="date"
                                                autoComplete="off"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="row">
                                <div className={isMovie ? "col-3-2" : "col-2"}>
                                    <FormField
                                        name="show.related_shows"
                                        className="shows"
                                        label={text("related_shows")}
                                        type="select"
                                        placeholder={text(
                                            "enter_related_shows"
                                        )}
                                        options={shows.map((show) => ({
                                            label: show.name,
                                            value: show.id,
                                        }))}
                                        multiple
                                    />
                                </div>

                                {isMovie ? (
                                    <div className="col-3-1">
                                        <FormField
                                            name="show.release_date"
                                            dateType="date"
                                            className="date"
                                            label={text("release_date")}
                                            type="text"
                                            autoComplete="off"
                                        />
                                    </div>
                                ) : isAnime ? (
                                    <Fragment>
                                        <div className="col-2">
                                            <div className="row">
                                                <div className="col-2">
                                                    <FormField
                                                        name="show.aired_from"
                                                        className="date"
                                                        label={text(
                                                            "aired_from"
                                                        )}
                                                        type="text"
                                                        autoComplete="off"
                                                        dateType="date-from"
                                                    />
                                                </div>
                                                <div className="col-2">
                                                    <FormField
                                                        name="show.aired_to"
                                                        className="date"
                                                        label={text("aired_to")}
                                                        type="text"
                                                        autoComplete="off"
                                                        dateType="date-to"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <div className="col-2">
                                        <FormField
                                            name="show.imdb_link"
                                            className="url"
                                            label={text("imdb_link")}
                                            type="url"
                                            placeholder={text("imdb_link_here")}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="row">
                                <div className="col-1">
                                    <FormField
                                        name="show.story"
                                        label={text("story")}
                                        type="textarea"
                                        placeholder={text(
                                            "something_about_show_story_here"
                                        )}
                                        required
                                    />
                                </div>
                            </div>
                            {!isTVShow && (
                                <div className="row">
                                    <div className="col-2">
                                        <FormField
                                            name="show.imdb_link"
                                            className="url"
                                            label={text("imdb_link")}
                                            type="url"
                                            placeholder={text("imdb_link_here")}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <FormField
                                            name="show.mal_link"
                                            className="url"
                                            label={text("mal_link")}
                                            type="url"
                                            placeholder={text("mal_link_here")}
                                        />
                                    </div>
                                </div>
                            )}
                        </FormSection>

                        <FormSection
                            header={text("gallery")}
                            faClass="far fa-images"
                            id="gallery"
                        >
                            <Gallery
                                gallery={data.gallery}
                                showName={data.name}
                                onChange={onChange}
                            />
                        </FormSection>

                        {isMovie && (
                            <Fragment>
                                <FormSection
                                    header={text("watching_servers")}
                                    faClass="fas fa-video"
                                    id="watching"
                                >
                                    {data.watching_servers.map((server, i) => (
                                        <ServerField
                                            key={i}
                                            serverNo={i}
                                            formName="show"
                                            value={server}
                                        />
                                    ))}
                                    <AddMoreBtn
                                        label={text("add_more_servers")}
                                        formName="show"
                                        listName="watching_servers"
                                    />
                                </FormSection>

                                <FormSection
                                    header={text(
                                        "video_files_and_download_links"
                                    )}
                                    faClass="far fa-file-video"
                                    id="video-files"
                                >
                                    {data.video_files.map((video_file, i) => (
                                        <VideoFileField
                                            key={i}
                                            videoNo={i}
                                            formName="show"
                                        />
                                    ))}

                                    <AddMoreBtn
                                        label={text("add_more_videos")}
                                        formName="show"
                                        listName="video_files"
                                    />
                                </FormSection>
                            </Fragment>
                        )}

                        {isAnime && (
                            <FormSection
                                header={text("anime_arcs")}
                                id="arcs"
                                faClass="fas fa-folder"
                            >
                                <Arcs />
                            </FormSection>
                        )}
                    </div>

                    <div id="end-side">
                        <FormSideSection
                            label={text("show_poster")}
                            id="show-poster-widget"
                            required
                        >
                            <PosterField posterFile={data.poster} />
                        </FormSideSection>

                        <FormSideSection
                            label={text("show_background")}
                            id="show-background-widget"
                            required
                        >
                            <BackgroundField backgroundFile={data.background} />
                        </FormSideSection>

                        <FormSideSection
                            label={text("square_image")}
                            id="show-square-image-widget"
                        >
                            <SquareImageField
                                onDelete={onShowImageDelete}
                                squareImageFile={data.square_image}
                            />
                        </FormSideSection>

                        <FormSideSection
                            label={text("trailer_link")}
                            id="trailer-link"
                        >
                            <div className="row">
                                <div className="col-1">
                                    <FormField
                                        type="url"
                                        name="show.trailer_link"
                                        placeholder={text("trailer_link_here")}
                                        unwrappedField
                                        htmlAfterField={
                                            <small>
                                                {text(
                                                    "you_can_use_any_other_video_sharing_service"
                                                )}
                                            </small>
                                        }
                                    />
                                </div>
                            </div>
                        </FormSideSection>

                        <FormSideSection label={text("tags")} id="tags">
                            <div className="row">
                                <div className="col-1">
                                    <TagsField
                                        type="select"
                                        name="show.tags"
                                        placeholder={text(
                                            "press_enter_after_any_tag_you_write"
                                        )}
                                        multiple
                                        tags
                                        unwrappedField
                                        htmlAfterField={
                                            <small>
                                                {text(
                                                    "used_to_group_collection_of_shows_together_under_certain_name"
                                                )}
                                            </small>
                                        }
                                    />
                                </div>
                            </div>
                        </FormSideSection>

                        <FormSideSection label={text("publish")} id="publish">
                            <PublishFields
                                form="show"
                                submitLabel={
                                    data.id
                                        ? text("save_changes")
                                        : text("create")
                                }
                                extraFields={[
                                    <FormField
                                        type="select"
                                        label={text("reviews")}
                                        name="show.reviews_enabled"
                                        options={[
                                            { label: text("enable"), value: 1 },
                                            {
                                                label: text("disable"),
                                                value: 0,
                                            },
                                        ]}
                                    />,
                                ]}
                                deleteBtn={
                                    data.id
                                        ? {
                                              label: text("delete"),
                                              handler: () => {
                                                  const deleteIt =
                                                      window.confirm(
                                                          "Are you sure to delete this show?"
                                                      );
                                                  deleteIt &&
                                                      deleteShowHandler(
                                                          data.id
                                                      );
                                                  history.replace("/shows");
                                              },
                                          }
                                        : undefined
                                }
                            />
                        </FormSideSection>
                    </div>
                </form>
            )}
        </Fragment>
    );
};

export default connect(
    (state) => ({
        ...state.forms.show,
        shows: state.shows,
        loggedUser: state.loggedUser,
    }),
    {
        onSubmit: showFormActions.onFormSubmit,
        onChange: showFormActions.onFieldChanged,
        onReset: showFormActions.onFormReset,
        onTypeChange: showFormActions.onFormTypeChange,
        onShowImageDelete: showFormActions.onShowImageDelete,
        onShowDataLoad: showFormActions.onShowDataLoad,
        deleteShowHandler: getDataActions("shows").deleteData,
    }
)(ShowForm);
