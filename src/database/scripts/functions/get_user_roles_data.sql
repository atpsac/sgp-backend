
CREATE OR REPLACE FUNCTION public.get_user_roles_data(IN user_id_param integer)
RETURNS TABLE (
    id integer, 
    username character varying, 
    email character varying, 
    roles json
)
LANGUAGE plpgsql
VOLATILE 
CALLED ON NULL INPUT
SECURITY DEFINER
PARALLEL UNSAFE
COST 100
AS 
$function$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.username,
        u.email,
        COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'name', r.name,
                    'permissions', COALESCE(
                        (SELECT JSON_AGG(p.name ORDER BY p.name) 
                         FROM roles_permissions rp2
                         INNER JOIN permissions p ON rp2.id_permissions = p.id
                         WHERE rp2.id_roles = r.id
                         AND rp2.is_active = true
                         AND p.is_active = true),
                        '[]'::json
                    )
                ) ORDER BY r.name
            ) FILTER (WHERE r.id IS NOT NULL AND r.is_active = true),
            '[]'::json
        ) as roles
    FROM users u
    LEFT JOIN users_roles ur ON u.id = ur.id_users AND ur.is_active = true
    LEFT JOIN roles r ON ur.id_roles = r.id AND r.is_active = true
    WHERE u.id = user_id_param
    GROUP BY u.id, u.username, u.email;
END;
$function$;