export type Photo = {
    id: string;
    slug: string;
    alternative_slugs: {
        [key: string]: string;
    };
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    breadcrumbs: {
        slug: string;
        title: string;
        index: number;
        type: string;
    }[];
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: {
        impression_urls: any[];
        tagline: string;
        tagline_url: string;
        sponsor: {
            id: string;
            updated_at: string;
            username: string;
            name: string;
            first_name: string | null;
            last_name: string | null;
            twitter_username: string;
            portfolio_url: string;
            bio: string;
            location: string;
            links: {
                self: string;
                html: string;
                photos: string;
                likes: string;
                portfolio: string;
                following: string;
                followers: string;
            };
            profile_image: {
                small: string;
                medium: string;
                large: string;
            };
            instagram_username: string;
            total_collections: number;
            total_likes: number;
            total_photos: number;
            total_promoted_photos: number;
            accepted_tos: boolean;
            for_hire: boolean;
            social: {
                instagram_username: string;
                portfolio_url: string;
                twitter_username: string;
                paypal_email: string | null;
            };
        };
    };
    topic_submissions: any;
    asset_type: string;
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string | null;
        last_name: string | null;
        twitter_username: string;
        portfolio_url: string;
        bio: string;
        location: string;
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
            following: string;
            followers: string;
        };
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        instagram_username: string;
        total_collections: number;
        total_likes: number;
        total_photos: number;
        total_promoted_photos: number;
        accepted_tos: boolean;
        for_hire: boolean;
        social: {
            instagram_username: string;
            portfolio_url: string;
            twitter_username: string;
            paypal_email: string | null;
        };
    };
};
